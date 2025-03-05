const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8080;

// const server = http.createServer();
// server.on
const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url
  );
  // console.log("checking filepath:-- ", filePath);
  const extName = String(path.extname(filePath)).toLowerCase();
  const mineTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "text/png",
  };

  //  we are defining object content type
  // application/octet-stream [it is a generic binary file]
  const contentType = mineTypes[extName] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "content-type": "text/html" });
        res.end("404: File not found Bruhhhhh!!!!!!!");
      }
    } else {
      res.writeHead(200, { "content-type": contentType });
      res.end(content, "utf-8");
    }
  });
});
server.listen(PORT, () => {
  console.log(`Server is currently running on port $http://localhost:${PORT}/`);
});
