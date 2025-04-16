const http = require("http");

const hostName = "127.0.0.1";
const PORT = 8000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Welcome to HOMEPAGE 🏠");
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Welcome to About page 📚");
  } else if (req.url === "/profile") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Welcome to admin dashboard 👤");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404: Page not Found!! ❌");
  }
});
server.listen(PORT, hostName, () => {
  console.log(`Server is listening   at http://${hostName}:${PORT}`);
});
