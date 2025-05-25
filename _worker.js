export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 规则1: /api/:match* -> http://43.167.194.126:8080/:match*
    if (url.pathname.startsWith('/api/')) {
      const newPath = url.pathname.substring('/api'.length); // 获取 /:match*
      const destinationURL = `http://43.167.194.126:8080${newPath}${url.search}`;
      return fetch(new Request(destinationURL, request));
    }

    // 规则 2: /agent-api/:match* -> http://43.167.194.126:8866/:match*
    if (url.pathname.startsWith('/agent-api/')) {
      const newPath = url.pathname.substring('/agent-api'.length); // 获取 /:match*
      const destinationURL = `http://43.167.194.126:8866${newPath}${url.search}`;
      return fetch(new Request(destinationURL, request));
    }

    
    try {
      return await env.ASSETS.fetch(request);
    } catch (e) {
      
      console.error(`ASSETS.fetch failed: ${e}`);
      return new Response('An error occurred', { status: 500 });
    }
  },
};