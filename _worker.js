export default {
  /**
   * This is a diagnostic fetch handler.
   */
  async fetch(request, env, context) {
    const url = new URL(request.url);

    // We are creating the simplest possible API endpoint at "/api/hello"
    // It only accepts GET requests by default.
    if (url.pathname === '/api/hello') {
      return new Response('Success! The backend is running.', {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    // For everything else, serve the static HTML/CSS/JS files.
    return context.next();
  }
};
