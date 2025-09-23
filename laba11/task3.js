import http from 'http'

const hostname = 'localhost';
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
  } else if (req.method === 'POST'){
    if (req.url === '/submit'){
      res.statusCode = 200;
    }
  } else{
    if (req.url === '/submit'){
      res.statusCode = 405;
      res.end('Method Not Allowed');
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
