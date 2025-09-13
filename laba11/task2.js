const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.method === 'GET') {
    if (req.url === '/') {
      res.statusCode = 200;
      res.end('Welcome to the homepage!');
    } else if (req.url === '/about') {
      res.statusCode = 200;
      res.end('This is the about page.');
    } else {
      res.statusCode = 404;
      res.end('404 Not Found');
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
