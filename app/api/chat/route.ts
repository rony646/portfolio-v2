import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import path from "path";
import fs from "node:fs";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PROFILE_PATH = path.join(
  process.cwd(),
  "content",
  "linkedin_profile.txt",
);

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
say "I'm not sure about that — feel free to reach out to me directly!"`;

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { messages } = await request.json();

    const profileText = getProfileText();

    const response = await openaiClient.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `${SYSTEM_PROMPT}\n\nHere is my full LinkedIn profile:\n${profileText}`,
        },
        ...messages,
      ],
      max_tokens: 1000,
    });

    return NextResponse.json({
      message: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("[/api/chat] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
