import { Ai } from '@cloudflare/ai';

export async function onRequest(context) {
  // STEP 1: Explicitly check if the request method is POST.
  // This is the new, critical part.
  if (context.request.method !== 'POST') {
    // If it's not POST, return a 405 error.
    return new Response('Method Not Allowed', {
      status: 405,
      // It's good practice to include the 'Allow' header with a 405 response.
      headers: {
        'Allow': 'POST'
      },
    });
  }

  // STEP 2: The rest of the code is the same, but it will ONLY
  // run if the method check above passes.
  try {
    const { prompt } = await context.request.json();
    
    const ai = new Ai(context.env.AI);

    const stream = await ai.run(
      '@cf/meta/llama-2-7b-chat-int8', 
      {
        prompt: prompt,
        stream: true
      }
    );

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
