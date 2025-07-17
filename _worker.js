```javascript
import { Ai } from '@cloudflare/ai';

export default {
  /**
   * The fetch handler is the main entry point for all requests.
   * @param {Request} request - The incoming request.
   * @param {object} env - Environment variables, including bindings like our AI.
   * @param {object} context - The execution context.
   */
  async fetch(request, env, context) {
    // Get the URL object to make routing easier
    const url = new URL(request.url);

    // Check if the request is for our specific API endpoint
    if (url.pathname === '/api/prompt') {
      
      // IMPORTANT: Check if the request method is POST.
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { 
          status: 405, 
          headers: { 'Allow': 'POST' } 
        });
      }

      // --- This is our AI logic from before ---
      try {
        const { prompt } = await request.json();
        
        // Note the change here: the binding is on 'env.AI' in this structure
        const ai = new Ai(env.AI); 
        
        const stream = await ai.run(
          '@cf/meta/llama-2-7b-chat-int8', 
          {
            prompt: prompt,
            stream: true
          }
        );

        return new Response(stream, {
          headers: { 'Content-Type': 'text/event-stream' }
        });

      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      // --- End of our AI logic ---
    }

    // For any other request (e.g., '/', '/style.css'),
    // let the default Cloudflare Pages static asset handler take over.
    // This is what serves your HTML, CSS, and front-end JS.
    return context.next();
  }
};
