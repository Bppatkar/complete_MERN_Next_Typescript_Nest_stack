import http from 'http';

const server = http.createServer((req, res) => {
  console.log(req, 'req');
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.end('Hello Node js from HTTP Module');
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server is now listening to port ${port}`);
});
