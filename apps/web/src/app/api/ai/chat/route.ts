// Force this route to run on the Vercel Edge Runtime for zero-latency AI streaming
export const runtime = 'edge';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // In a real application, this would pipe the stream from OpenAI or a local LLM
    // using the Vercel AI SDK, taking advantage of the Edge Runtime's lack of cold starts.
    const mockStream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('Simulated AI stream from Vercel Edge...'));
        controller.close();
      }
    });

    return new Response(mockStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Edge Error' }, { status: 500 });
  }
}
