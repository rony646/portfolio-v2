import { NextRequest, NextResponse } from "next/server";
import { Resource } from "sst";
import OpenAI from "openai";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import path from "path";
import fs from "node:fs";

const openaiClient = new OpenAI({
  apiKey: Resource.OpenAiApiKey.value,
});
const sesClient = new SESv2Client({});

const PROFILE_PATH = path.join(process.cwd(), "content", "linkedin_profile.txt");

let cachedProfileText: string | null = null;

function getProfileText(): string {
  if (cachedProfileText) return cachedProfileText;
  cachedProfileText = fs.readFileSync(PROFILE_PATH, "utf8");
  return cachedProfileText;
}

const SYSTEM_PROMPT = `
You are Rony Silva, a software engineer. Answer questions as if you are him, 
in first person. Use the following profile data to answer:

Software Engineer from Brazil focused on building scalable, 
high performance digital products with strong user experience. 
I have experience collaborating with international teams, improving frontend architecture, 
and driving product growth, including helping scale a platform from 8k to 30k monthly active users. 
I also have hands on experience with backend services, 
AWS, LLM API integrations (OpenAI, Gemini, Groq), and AI tools like Cursor.

If you don't know something or it's not covered in the profile data, 
say "I'm not sure about that — feel free to reach out to me directly!".

When you are unsure or the question is not covered by the profile data, call the tool
"report_unknown_question" exactly once with the user's question and a short reason.`;

const UNKNOWN_QUESTION_TOOL_NAME = "report_unknown_question";

type ChatMessage = {
  role?: string;
  content?: unknown;
};

function getLastUserQuestion(messages: ChatMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message?.role === "user" && typeof message.content === "string") {
      return message.content;
    }
  }

  return "Question unavailable";
}

function parseToolArguments(rawArguments: string): {
  question?: string;
  reason?: string;
} {
  try {
    const parsed = JSON.parse(rawArguments) as { question?: string; reason?: string };
    return parsed;
  } catch {
    return {};
  }
}

async function notifyUnknownQuestion(question: string, askedAt: string): Promise<void> {
  const emailBody = [
    "A user asked a question that could not be answered.",
    "",
    `Asked at: ${askedAt}`,
    `Question: ${question}`,
  ].join("\n");

  await sesClient.send(
    new SendEmailCommand({
      FromEmailAddress: Resource.TransactionalEmail.sender,
      Destination: {
        ToAddresses: ["ronypeterson646@outlook.com"],
      },
      Content: {
        Simple: {
          Subject: { Data: "[portfolio-v2] Unknown chat question" },
          Body: {
            Text: { Data: emailBody },
          },
        },
      },
    }),
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { messages } = await request.json();
    const askedAt = new Date().toISOString();

    const profileText = getProfileText();
    const fallbackQuestion = getLastUserQuestion(messages);

    const firstResponse = await openaiClient.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `${SYSTEM_PROMPT}\n\nHere is my full LinkedIn profile:\n${profileText}`,
        },
        ...messages,
      ],
      tools: [
        {
          type: "function",
          function: {
            name: UNKNOWN_QUESTION_TOOL_NAME,
            description:
              "Report a user question that you could not answer from available profile data.",
            parameters: {
              type: "object",
              properties: {
                question: {
                  type: "string",
                  description: "The user's original question.",
                },
                reason: {
                  type: "string",
                  description: "Short reason why the question cannot be answered confidently.",
                },
              },
              required: ["question", "reason"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: "auto",
      max_tokens: 1000,
    });

    const assistantMessage = firstResponse.choices[0].message;
    const toolCall = assistantMessage.tool_calls?.find(
      (call) => call.type === "function" && call.function.name === UNKNOWN_QUESTION_TOOL_NAME,
    );

    if (toolCall?.type === "function") {
      const args = parseToolArguments(toolCall.function.arguments);
      const question = args.question?.trim() || fallbackQuestion;
      const reason = args.reason?.trim() || "Model indicated insufficient profile context";
      try {
        await notifyUnknownQuestion(question, askedAt);
      } catch (emailError) {
        console.error("[/api/chat] failed to notify unknown question:", emailError);
      }

      const secondResponse = await openaiClient.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `${SYSTEM_PROMPT}\n\nHere is my full LinkedIn profile:\n${profileText}`,
          },
          ...messages,
          assistantMessage,
          {
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify({
              status: "notified",
              askedAt,
              question,
              reason,
            }),
          },
        ],
        max_tokens: 1000,
      });

      return NextResponse.json({
        message:
          secondResponse.choices[0].message.content ??
          "I'm not sure about that — feel free to reach out to me directly!",
      });
    }

    return NextResponse.json({ message: assistantMessage.content ?? "" });
  } catch (error) {
    console.error("[/api/chat] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
