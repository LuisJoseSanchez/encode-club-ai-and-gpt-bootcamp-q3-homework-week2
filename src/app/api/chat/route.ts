import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { RateLimiterMemory } from 'rate-limiter-flexible';

const openai = new OpenAI();

const rateLimiter = new RateLimiterMemory({
  points: 1, // Number of points
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
        content: `You are a professional storyteller who has been hired to write a series of short stories for a new anthology. The stories should be captivating, imaginative, and thought-provoking. They should explore a variety of themes and genres, from science fiction and fantasy to mystery and romance. Each story should be unique and memorable, with compelling characters and unexpected plot twists.`,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}