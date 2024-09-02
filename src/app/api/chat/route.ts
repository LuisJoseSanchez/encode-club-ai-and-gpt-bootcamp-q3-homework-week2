import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { RateLimiterMemory } from 'rate-limiter-flexible';

const openai = new OpenAI();

const rateLimiter = new RateLimiterMemory({
  points: 1, // Number of requests per hour (10 requests per hour), limit is reset if update page
  duration: 3600, // Per hour
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('remoteAddress') || 'unknown';
    await rateLimiter.consume(ip);
  } catch (rateLimiterRes) {
    return new Response(JSON.stringify({ error: 'Too many requests, please try again later.' }), { status: 429 });
  }

  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {
        role: "system",
        content: `You are a professional comedian who has been hired to tell jokes. Make it short and funny. Max 500 characters. Do not user markdown but use newlines and if there's dialogue use markers like -`,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
