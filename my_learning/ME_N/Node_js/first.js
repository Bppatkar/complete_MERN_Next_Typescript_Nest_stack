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
//* 6) url - Work with URLs.
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
//! Response Object
/* 
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