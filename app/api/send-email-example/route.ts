import { NextRequest, NextResponse } from "next/server";
import { Resource } from "sst";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const sesClient = new SESv2Client({});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { to, subject, message } = await request.json();

    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: "Fields 'to', 'subject', and 'message' are required" },
        { status: 400 },
      );
    }

    await sesClient.send(
      new SendEmailCommand({
        FromEmailAddress: Resource.TransactionalEmail.sender,
        Destination: {
          ToAddresses: [to],
        },
        Content: {
          Simple: {
            Subject: { Data: subject },
            Body: {
              Text: {
                Data: message,
              },
            },
          },
        },
      }),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/send-email-example] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
