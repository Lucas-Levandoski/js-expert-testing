const { once } = require('events');
const http = require('http');

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page');
    return response.end();
  },
  '/login:post': async (req, res) => {
    const data = JSON.parse(await once(req, 'data'));
    console.log({ data });

    return res.end();
  },
  default(request, response) {
    response.writeHead(404);
    return response.end('not found');
  }
}

function handler(request, response) {
  const { url, method } = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  console.log(routeKey, chosen.name);
  return chosen(request, response);
}

const app = http.createServer(handler).listen(3000, () => console.log('running at 3000'));

