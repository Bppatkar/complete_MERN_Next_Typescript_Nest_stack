const http = require("http");
const fs = require("fs");

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "content-type": "plain/text" });
//   res.end("hello i am from node server");
// });

const server = http.createServer((req, res) => {
  // if (req.url === "/") {
  //   res.writeHead(200, { "Content-Type": "text/plain" });
  //   res.end("<h1>welcome to nikunj </h1>");
  // } else if (req.url === "/api/user") {
  //   const user = {
  //     name: "bhanu pratap patkar",
  //     age: 26,
  //     email: "bhanupratap@gmail.com",
  //   };
  //   const data = JSON.stringify(user);
  //   console.log(data);
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(data);
  // } else if (req.url === "/login") {
  //   res.writeHead(200, { "content-type": "text/plain" });
  //   res.end("<h1>Login Successfully </h1>");
  // } else if (req.url === "/SignUp") {
  //   res.writeHead(200, { "content-type": "text/plain" });
  //   res.end("<h1>SignUp Successfully </h1>");
  // } else {
  //   res.writeHead(404, { "content-type": "text/html" });
  //   res.end("<h2>Page not found</h2>");
  // }
  //! handling post data
  // if (req.method === "POST" && req.url === "/submit") {
  //   let body = "";
  //   req.on("data", (chunk) => {
  //     body += chunk.toString();
  //   });
  //   req.on("end", () => {
  //     console.log(JSON.parse(body));
  //     res.writeHead(200, { "content-type": "application/json" });
  //     res.end(
  //       JSON.stringify({
  //         success: true,
  //         message: "Account created successfully",
  //       })
  //     );
  //   });
  // } else {
  //   res.writeHead(404, { "content-type": "application/json" });
  //   JSON.stringify({
  //     success: false,
  //     message: "Something Error!!!!",
  //   })
  // }
  //! getting file from frontend
  //we have to use fs module to read frontend html file [any] file
  // i created a simple html file now we use it here
  res.writeHead(200, { "content-type": "text/html" });
  const htmlContent = fs.readFileSync(__dirname + "/index.html");
  res.end(htmlContent);
});

server.listen(3000, () => {
  console.log("server is running at port 3000");
});
