import { Ai } from '@cloudflare/ai';

export async function onRequestPost(context) {
    // Get the prompt from the POST request body
    const { prompt } = await context.request.json();
    
    const ai = new Ai(context.env.AI);

    // This tells the AI to stream its response
    const stream = await ai.run(
        '@cf/meta/llama-2-7b-chat-int8', 
        {
            prompt: prompt,
            stream: true // Enable streaming
        }
    );

    // Return the stream directly to the front-end
    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream'
        }
    });
}
