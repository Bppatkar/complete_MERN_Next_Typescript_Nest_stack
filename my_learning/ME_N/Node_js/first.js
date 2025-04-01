/* //! What is Node.js?
// Node.js is an open-source, cross-platform, back-end JavaScript runtime environment and library.
// Node.js is a JavaScript runtime environment that allows you to run JavaScript code outside of a web browser.
// Node.js is a server-side JavaScript runtime environment, which means it can be used to create server-side applications.
// Node.js is a free and open-source JavaScript runtime environment that allows you to run JavaScript code outside of a web browser.
// Node.js is a server-side JavaScript runtime environment, which means it can be used to create server-side applications. */

//? _______________________________________________________

/* //! file system module

// const fs = require("fs");

// //define two variables
// let a = 10;
// let b = 10;

// //Basic arithmetic operations
// let sum = a + b;
// let product = a * b;

// //prepare data to write
// let data = `Sum: ${sum}\n Product : ${product}`;

// //!write data to a local file
// fs.writeFile("output.txt", data, (err) => {
//   if (err) throw err;
//   console.log("Data written to file");
// });

// //!read data from a local file
// fs.readFile('output.txt', 'utf8', (err, data) => {
//   if (err) {
//       console.error(err);
//       return;
//   }
//   console.log(data);
// });

// //! append data to a local file (without overwriting the existing data)
// fs.appendFile('output.txt', '\nAppended Content', (err) => {
//   if (err) {
//       console.error(err);
//       return;
//   }
//   console.log('Content has been appended!');
// });

// //! delete a local file
// fs.unlink('example.txt', (err) => {
//   if (err) {
//       console.error(err);
//       return;
//   }
//   console.log('File deleted!');
// }); */

//? _______________________________________________________

/* //! REPL (Read Eval Print Loop) 
// it is a computer environment where user can write and execute code in a continuous loop.
//In Node.js, the REPL is a simple way to experiment with code and see immediate results.
//The REPL is a simple text-based interface, where user can write JavaScript code and see immediate results.
//For example, if user enters the expression 2+2, the REPL will print 4 as the result.
//REPL is also known as Node Shell or JS Shell.
//! The node command line interface, also known as the REPL (Read-Eval-Print Loop), is a simple way to experiment with code and see immediate results.
//To start the REPL, just type node at the command line. The REPL has a prompt, which is the > symbol.
//You can type any valid JavaScript expression at the prompt and press Enter to execute it.
//The result of the expression will be displayed in the console, and a new prompt will be displayed to enter another expression.
//! The REPL is a very useful tool for quickly testing a piece of code or experimenting with a new feature. */

//? _______________________________________________________

/* //! Node Core Modules
//* 1) fs (file system) - Handle file system operations like reading and writing files.
//* 2) http - Handle HTTP requests and responses.
//* 3) https - Handle HTTPS requests and responses. (more secure)
//* 4) path - Work with file paths and directories. (file handling)
//* 5) path.os - Access operating system information. (operating system related utility methods and properties)
//* 6) url.toLocaleLowerCase() - Work with URLs.
//* 7) net - Create and manage network connections.
//* 8) stream - Work with streams of data.
//* 9) events - Handle events and event emitters. (event-driven programming)
//* 10) timers - Handle timers and time-based operations.
//* 11) crypto - Handle cryptographic operations. (encryption, decryption, hashing) */

//? _______________________________________________________

/* //! Creating First Node Server and request object

const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  process.exit();
});
server.listen(3000, () =>
  console.log(`server is running at http://localhost:3000`)
); */

//? _______________________________________________________

/*  //! Response Object

const http = require("http");

const server = http.createServer((req, res) => {
  //res.setHeader("Content-Type", "json");
  res.setHeader("Content-type", "text-html");
  res.write('<html>');
  res.write("<head><title>Learning about MERN stack</title></head>");
  res.write("<body><h1> response object</h1></body>");
  res.write('</html>');
  res.end();
});
server.listen(3000, () =>
  console.log(`server is running at http://localhost:3000`)
); */

//? _______________________________________________________

/* //! Routing Request

const http = require("http");

const server = http.createServer((req, res) => {

  let url = req.url;
  if (url.toLowerCase() === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Welcome to HOMEPAGE 🏡");
  } else if (url.toLowerCase() === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Welcome to About page 📚");
  } else if (url.toLowerCase() === "/profile") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Welcome to admin dashboard 👤");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404: Page not Found!! ❌");
  }
});
server.listen(3000, () =>
  console.log(`server is running at http://localhost:3000`)
);
 */

//? _______________________________________________________

/* //! taking user input

const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text-html");
  res.write("<html>");
  res.write("<head><title>User Input Form</title></head>");
  res.write("<body>");
  res.write('<form action="/submit" method="POST">');
  res.write('<label for="name">Name:</label>');
  res.write('<input type="text" id="name" name="name" required><br><br>');
  res.write('<label for="gender">Gender:</label>');
  res.write('<input type="radio" id="male" name="gender" value="male">');
  res.write('<label for="male">Male</label>');
  res.write('<input type="radio" id="female" name="gender" value="female">');
  res.write('<label for="female">Female</label><br><br>');
  res.write('<button type="submit">Submit</button>');
  res.write("</form>");
  res.write("</body>");
  res.write("</html>");
  res.end();
});
server.listen(3000, () =>
  console.log(`server is running at http://localhost:3000`)
); */
//* after submitting form go to network tab and see the output in payload or response tab

//? _______________________________________________________

/* //! redirecting request (using fs module)
//using same code as above

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  if (req.url === "/") {
    res.setHeader("Content-type", "text-html");
    res.write("<html>");
    res.write("<head><title>User Input Form</title></head>");
    res.write("<body>");
    res.write('<form action="/submit" method="POST">');
    res.write('<label for="name">Name:</label>');
    res.write('<input type="text" id="name" name="name" required><br><br>');
    res.write('<label for="gender">Gender:</label>');
    res.write('<input type="radio" id="male" name="gender" value="male">');
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="female" name="gender" value="female">');
    res.write('<label for="female">Female</label><br><br>');
    res.write('<button type="submit">Submit</button>');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else if (req.method == "POST" && req.url.toLowerCase() === "/submit") {
    fs.writeFileSync("data.txt", 'bhanu pratap patkar'); //creating new file data.txt
    
    res.statusCode = 301; // redirecting to home page 
    res.setHeader("Location", "/"); // redirecting to home page
    res.end();
  }
});
server.listen(3000, () =>
  console.log(`server is running at http://localhost:3000`)
);
 */

//? _______________________________________________________

//! Parsing Request
// we are facing problem to read the form data so we learn
// 1) Streams 2) Chunks 3) Buffers 4) Reading Chunk 5) Buffering Chunks 6) Parsing Request 7) Using Modules

//* Streams are sequences of data that can be read or written in a continuous flow.
//* Chunks are pieces of data that are processed in streams.
//* Buffers are temporary storage areas for chunks of data.

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-type", "text-html");
    // res.write("<html>");
    // res.write("<head><title>User Input Form</title></head>");
    // res.write("<body>");
    // res.write('<form action="/submit" method="POST">');
    // res.write('<label for="name">Name:</label>');
    // res.write('<input type="text" id="name" name="name" required><br><br>');
    // res.write('<label for="gender">Gender:</label>');
    // res.write('<input type="radio" id="male" name="gender" value="male">');
    // res.write('<label for="male">Male</label>');
    // res.write('<input type="radio" id="female" name="gender" value="female">');
    // res.write('<label for="female">Female</label><br><br>');
    // res.write('<button type="submit">Submit</button>');
    // res.write("</form>");
    // res.write("</body>");
    // res.write("</html>");
    res.write(`<html>
      <head><title>User Input Form</title></head>
      <body>
        <form action="/submit" method="POST">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required><br><br>
          <label for="gender">Gender:</label>
          <input type="radio" id="male" name="gender" value="male">
          <label for="male">Male</label>
          <input type="radio" id="female" name="gender" value="female">
          <label for="female">Female</label><br><br>
          <button type="submit">Submit</button>
        </form>
      </body>
      </html>`);
    res.end();
  } else if (req.method == "POST" && req.url.toLowerCase() === "/submit") {
    //! here i made change
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
      //! we got this
      // <Buffer 6e 61 6d 65 3d 6d 75 6d 6d 79 26 67 65 6e 64 65 72 3d 66 65 6d 61 6c 65>
      // we have to put it in buffer because it is in buffer format and if we are dealing with big data so we dont want that big data at same time we want that data in small small chunks so we use this--->
    });
    //! changes made (we have to create empty object called body where data will be stored and push data when chunk is arrived so where we are logging console chunk we push data into that object)
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody); //name=radheRani&gender=female
    });

    fs.writeFileSync("data.txt", "bhanu pratap patkar"); //creating new file data.txt

    res.statusCode = 301; // redirecting to home page
    res.setHeader("Location", "/"); // redirecting to home page
    res.end();
  }
});
server.listen(3000, () =>
  console.log(`server is running at http://localhost:3000`)
);

//? _______________________________________________________
