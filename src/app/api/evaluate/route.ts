import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  const { joke } = await req.json();

  // Send request to OpenAI for joke evaluation
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: false,
    messages: [
        {
            role: "system",
            content: `You are a professional evaluator of jokes. Evaluate the joke provided based on its humor, creativity, and overall appeal. Provide a concise and objective assessment.`,
        },
        {
            role: "user",
            content: `${joke}`,
        },
    ]
  });

  // Extract the evaluation from the response
  const evaluation = response.choices[0].message.content;

  return NextResponse.json({ evaluation });
}