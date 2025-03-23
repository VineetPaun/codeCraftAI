import { chatSession } from "@/configs/AIModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();
  try {
    const result = await chatSession.sendMessage(prompt);
    const AIResp = await result.response.text();
    return NextResponse.json({ result: AIResp });
  } catch (e) {
    console.error("AI Chat API Error:", e);
    return NextResponse.json(
      { error: e.message || "An error occurred" },
      { status: 500 }
    );
  }
}
