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

/* const http = require("http");
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
      const outputData = Buffer.concat(body).toString();
      console.log(outputData); //name=radhe+rani&gender=female
    });

    fs.writeFileSync("data.txt", "bhanu pratap patkar"); //creating new file data.txt

    res.statusCode = 301; // redirecting to home page
    res.setHeader("Location", "/"); // redirecting to home page
    res.end();
  }
});
server.listen(3000, () =>
  console.log(`server is running at http://localhost:3000`)
); */

//? _______________________________________________________

/* //! above code without comment

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  
  if (req.url === "/") {
    res.setHeader("Content-type", "text-html");
    res.write(`
      <html>
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
      </html>
    `);
    res.end();
  } 
  else if (req.method === "POST" && req.url.toLowerCase() === "/submit") {
    const body = [];
    //trigging event
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    
    req.on("end", () => {
      const outputData = Buffer.concat(body).toString();
      console.log(outputData);
    });

    fs.writeFileSync("data.txt", "bhanu pratap patkar");
    
    res.statusCode = 301;
    res.setHeader("Location", "/");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
}); */

//? _______________________________________________________

// now we got actual body [name=radhe+rani&gender=female]
// now we are going to parsing that request means we are going to read that request [actually when we send a request it become encrypted , so when we want to get that request we have to decrypt to read it]
/* //! Using URLSearchParams method
//? using above code

const http = require("http");
const fs = require("fs");
const { URLSearchParams } = require("url");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  if (req.url === "/") {
    res.setHeader("Content-type", "text-html");
    res.write(`
      <html>
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
      </html>
    `);
    res.end();
  } else if (req.method === "POST" && req.url.toLowerCase() === "/submit") {
    const body = [];
    //trigging event
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const outputData = Buffer.concat(body).toString();
      console.log(outputData);
      //! changes made here

      const checkNewParam = new URLSearchParams(outputData);
      console.log(checkNewParam);
      //? we got object - URLSearchParams { 'name' => 'sok som ething', 'gender' => 'female' }
      // we are going to store that object data into new object in key value pair
      const jsonData = {};
      for (const [key, value] of checkNewParam.entries()) {
        jsonData[key] = value;
      }
      console.log(jsonData); //{name:'sok som ething', 'gender' 'female'}
      fs.writeFileSync("data.txt", JSON.stringify(jsonData));
    });

    // fs.writeFileSync("data.txt", "bhanu pratap patkar");

    res.statusCode = 301;
    res.setHeader("Location", "/");
    res.end();
    }
    });
    
server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
 */

//? _______________________________________________________

//! Using Modules
//* we are going to break that whole code into small small chunks and then we are going to import that modules into our code

// i am giving a demo [not actually creating new file ok]

//TODO: app.js

/* const http = require('http');
const requestHandler = require('./requestHandler');

const server = http.createServer(requestHandler);

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
}); */

//TODO: requestHandler.js

/* const fs = require('fs');
const { showForm, handleSubmit } = require('./handlers');

function requestHandler(req, res) {
  console.log(req.url, req.method);
  
  if (req.url === "/") {
    showForm(res);
  } 
  else if (req.method === "POST" && req.url.toLowerCase() === "/submit") {
    handleSubmit(req, res);
  }
}

module.exports = requestHandler; */

//TODO: handlers.js

/* //! function showForm
const fs = require('fs');
function showForm(res) {
  res.setHeader("Content-type", "text-html");
  res.write(`
    <html>
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
    </html>
  `);
  res.end();
} 
*/

/* //! function handleSubmit
function handleSubmit(req, res) {
  const body = [];
  
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  
  req.on("end", () => {
    const outputData = Buffer.concat(body).toString();
    console.log("Raw form data:", outputData);
    
    // Parse the form data using URLSearchParams
    const formData = new URLSearchParams(outputData);
    console.log("Parsed URLSearchParams:", formData);
    
    // // Convert to plain object
    // const jsonData = {};
    // for (const [key, value] of formData.entries()) {
    //   jsonData[key] = value;
    // }
    // console.log("JSON data:", jsonData);
    const jsonData = Object.fromEntries(formData.entries());
    
    // Save to file
    fs.writeFileSync("data.txt", JSON.stringify(jsonData, null, 2));
    
    // Redirect
    res.statusCode = 301;
    res.setHeader("Location", "/");
    res.end();
  });
}

module.exports = { showForm, handleSubmit }; */

//? _______________________________________________________

//! Event Loop
//? For Blog reading
// [LINK]("https://www.builder.io/blog/visual-guide-to-nodejs-event-loop");
//? for video - check Piyush Garg video on Utube

/* //! Blocking vs Non Blocking code 
//? predict the output
console.log("1. Start - Synchronous"); // 1️⃣ First (main thread)

// Timers Phase
setTimeout(() => console.log("7. Timer 1 - 0ms"), 0); // 7️⃣
setImmediate(() => console.log("8. Immediate 1")); // 8️⃣

// Microtasks (Promise)
Promise.resolve().then(() => console.log("3. Promise 1")); // 3️⃣

// I/O Phase
const fs = require("fs");
fs.readFile(__filename, () => {
  console.log("6. I/O Callback"); // 6️⃣

  // Inside I/O we get different immediate/timer order
  setTimeout(() => console.log("10. Timer 2"), 0); // 🔟
  setImmediate(() => console.log("9. Immediate 2")); // 9️⃣
  process.nextTick(() => console.log("5. Next Tick 2")); // 5️⃣
});

// Microtasks (Promise)
Promise.resolve().then(() => console.log("4. Promise 2")); // 4️⃣

// Next Tick Queue
process.nextTick(() => console.log("2. Next Tick 1")); // 2️⃣

console.log("11. End - Synchronous"); // 1️⃣1️⃣ Last synchronous */

//* Output
/* 
1. Start - Synchronous
11. End - Synchronous
2. Next Tick 1       
3. Promise 1
4. Promise 2
7. Timer 1 - 0ms     
8. Immediate 1       
6. I/O Callback      
5. Next Tick 2       
9. Immediate 2       
10. Timer 2
 */

/*
EVENT LOOP PHASES DEMO (Execution Order):

┌───────────────────────┐
│       Synchronous     │ → 1, 11
└──────────┬────────────┘
           │
┌──────────▼────────────┐
│   Next Tick Queue     │ → 2
└──────────┬────────────┘
           │
┌──────────▼────────────┐
│    Microtasks         │ → 3, 4
└──────────┬────────────┘
           │
┌──────────▼────────────┐ 
│        I/O            │ → 6
└──────────┬────────────┘
           │
┌──────────▼────────────┐
│       Timers          │ → 7
└──────────┬────────────┘
           │
┌──────────▼────────────┐
│       Check           │ → 8, 9
└──────────┬────────────┘
           │
┌──────────▼────────────┐
│   Close Callbacks     │
└──────────────────────┘
*/

//! above code is using writeFileSync which is blocking code
//? so solution is to use writeFile which is non-blocking code
//* rewrite code again without comment

/* const http = require("http");
const fs = require("fs");
const { URLSearchParams } = require("url");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log(`req url and req method:${req.method} ${req.url}`);

  if (req.url === "/") {
    res.setHeader("Content-type", "text/html"); // Fixed content-type
    res.end(`
      <html>
        <head><title>User Input Form</title></head>
        <body>
          <form action="/submit" method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br><br>
            <label for="gender">Gender:</label>
            <input type="radio" id="male" name="gender" value="male" required>
            <label for="male">Male</label>
            <input type="radio" id="female" name="gender" value="female">
            <label for="female">Female</label><br><br>
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `);
  } else if (req.method === "POST" && req.url.toLowerCase() === "/submit") {
    let body = [];

    req.on("data", (chunk) => {
      console.log("chunk: ", chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      try {
        const outputData = Buffer.concat(body).toString();
        const formData = new URLSearchParams(outputData);
        const jsonData = Object.fromEntries(formData);
        const filePath = path.join(__dirname, "data.txt");

        console.log("Form data to save:", jsonData);
        console.log("Saving to:", filePath);

        // Async file write with error handling
        fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
          if (err) {
            console.error("Error saving file:", err);
            res.writeHead(500).end("Server Error");
            return;
          }

          console.log("Data saved successfully");
          res.writeHead(302, { Location: "/" }).end();
        });
      } catch (err) {
        console.error("Processing error:", err);
        res.writeHead(500).end("Server Error");
      }
    });
  } else {
    res.writeHead(404).end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
}); */



