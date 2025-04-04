//! What is Express.js
// Express js is a minimal and flexible web application framework for nodejs
// it provide a robust set of features for building single-page, multiple-page, and hybrid web applications.
// Express js simplifies server-side coding by providing a layer of fundamental web application features.

//! **Need of Express.js**

//Express.js Simplifies Server Creation**: Helps in quickly setting up and running a web server without the need for complex coding.
//?Routing Management**: Provides a powerful routing mechanism to handle URLs and HTTP methods effectively.
//Middleware Support**: Allows the use of middleware to handle requests, responses, and any middle operations, making code modular and maintainable.
//?API Development**: Facilitates easy and efficient creation of RESTful APIs.
//Community and Plugins**: Has a large ecosystem with numerous plugins and extensions, accelerating development time.

//! Installing Express js and creating a server
// npm init --> npm i express

//? now we are using express and creating a server
/* const express = require("express");
const app = express();

let PORT = 3000;

app.listen(3000, () => {
  console.log(`server is running at port http://localhost:${PORT}`);
}); */

//! All about Middleware

//? Middleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.
// Middleware functions are typically used to perform tasks such as authentication, logging, error handling, and more.
//? Middleware functions are executed in the order they are registered in the application's request-response cycle.
// Middleware functions can modify the request and response objects, and can also pass control to the next middleware function in the chain.
//? Middleware functions are often used to handle common tasks such as authentication, logging, and error handling.

//* we use middleware in express js by using app.use() method
//? app.use() method is used to register middleware functions with the Express application.

/* const express = require("express");
const app = express();

let PORT = 3000;

app.listen(3000, () => {
  console.log(`server is running at port http://localhost:${PORT}`);
});

app.use((req,res, next)=>{console.log("First middleware",req.url, req.method); next();})
// if we don't use next(), second middleware will not work
app.use((req,res, next)=>{console.log("second middleware",req.url, req.method); }) */

//! Sending a response
/* 
const express = require("express");
const app = express();

let PORT = 3000;

app.listen(3000, () => {
  console.log(`server is running at port http://localhost:${PORT}`);
});

app.use((req,res, next)=>{console.log("First middleware",req.url, req.method); next();})

app.use((req,res, next)=>{console.log("Second middleware",req.url, req.method); res.send('<p>Sending a response from middleware</p>'); })
 */

//! Handling Routes

//* 1) Order matches
//* 2) Can not call next() after send()
//* 3) "/" matches all routes [matches everything]
//* 4) Calling res.send will end the request-response cycle means res.send implicitly calls res.end();

// app.use([path,]callback[,callback...]);
// arguments: by default '/' is path and callback is a function for instance
// with "/"
/*  app.use("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
  }); */
// --------------------------------------------------------------
/* const express = require("express");
const app = express();

let PORT = 3000;

app.listen(3000, () => {
  console.log(`server is running at port http://localhost:${PORT}`);
});

// ✅ Corrected middleware and routes (should be defined BEFORE app.listen)
app.use((req, res, next) => {
  console.log("First middleware", req.url, req.method);
  next(); // Call next() BEFORE sending a response
});

// Home route - use app.get() instead of app.use() for specific routes
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
  // ⚠️ Never call next() after res.send()
});

//* // ⚠️ WARNING: This is BAD PRACTICE (but technically works in some cases)
//* // Using "about" without a leading slash means:
//* // - It will match "/aboutabout" (path contains "about")
//* // - It will NOT match "/about" or "/about/" (unexpected behavior!)
//* // - This is confusing and should be avoided!
//* app.use("about", (req, res) => {
//*   res.send("<h1>About Page (Flawed Implementation)</h1>");
//* });

// ✅ CORRECT WAY: Always use leading slashes in Express paths
// - Matches EXACTLY "/about" and "/about/" (Express normalizes trailing slashes)
// - Does NOT match "/about123" or other variations
// - This is the standard Express routing behavior
app.use("/about", (req, res) => {
  res.send("<h1>About Page (Correct Implementation)</h1>");
});
 */

//! Correct version of code
/* const express = require("express");  
const app = express();

// Use const since PORT shouldn't change
const PORT = 3000;

// 1️⃣ General middleware - runs for all requests
app.use((req, res, next) => {
  console.log("Middleware:", req.method, req.url);
  next(); // Important to call next() to continue processing
});

// 2️⃣ Home route - proper GET handler
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
  // Never call next() after sending response
});

// 3️⃣ Correct about route - proper GET handler
app.get("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
});

// 4️⃣ Error handling middleware (should be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server AFTER all routes are configured
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); */

//! Small Project [form input and print response from body]
//* get data from body using body parser [app.use(express.urlencoded({ extended: true }));]

/* const express = require("express");
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send(`
    <form action="/contact" method="POST">
      <input type="text" name="username" placeholder="username">
      <input type="gmail" name="gmail" placeholder="gmail">
      <button type="submit">Submit</button>
    </form>
    `);
});

app.post("/contact", (req, res) => {
  const { username, gmail } = req.body;
  // console.log(req.body); // we get undefined because data is not /parsed

  res.send(`
    <h1>Form Submitted Successfully!</h1>
    <h2>Submitted Data:</h2>
    <p>Username: ${username}</p>
    <p>Email: ${gmail}</p>
    <a href="/">Back to Form</a>
  `);
});

const PORT = 3000;
app.listen(3000, () => {
  console.log(`server is running at port http://localhost:${PORT}`);
}); */

//! Express Routing
//* you have to create separate "Routes folder" and put all the route in that folder

/* // ==========================================
// This is a combined version demonstrating how
// the code would work if split into two files:
// app.js and userRouter.js
// ==========================================

const express = require("express");
const app = express();

// ==========================================
// This section represents what would be in userRouter.js
// ==========================================
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  console.log("Home page accessed", req.url, req.method);
  res.send(`
    <h2>Welcome to Home Page</h2>
    <a href="/contact">Go to Contact Page</a>
  `);
});

userRouter.get("/contact", (req, res) => {
  console.log("Contact page accessed", req.url, req.method);
  res.send(`
    <h2>Contact Page</h2>
    <a href="/">Back to Home</a>
  `);
});

// ==========================================
// This section represents what would be in app.js
// ==========================================
// Normally you would import the router like this:
// const userRouter = require("./userRouter");

// Use the router
app.use("/", userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); */

//! Handling 404 page
// app.use middleware use for every page because it is using .use so we put 404 page in app.use middleware

/* app.use((req, res,next) => {
res.status(404).send("<h1>404 Page Not Found</h1>"
}) */

//! common paths

/* // common paths
router.get("/about-us", (req, res) => {
  res.send("<h1>About Us</h1>");
});

router.get("/contact-us", (req, res) => {
  res.send("<h1>Contact Us</h1>");
});

// common paths is like [/api/v1/users] so we put that path somewhere else so that we can use it in other routes

app.use("/api/v1/users", router);
// it become [/api/v1/users/about-us] and [/api/v1/users/contact-us]
 */

//! Views folder [serving HTML files]
// we have to create a views folder and put all the html file in that folder [we are writing html file in res.send previously to solved that problem we put html file in views folder]

// i have created that views folder and one home.html file and i am using that file in res.send let's see how
//* we use res.sendFile method for that we have to use core module
// const path = require("path");

/* app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
  }); */

/* const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  // console.log("Directory Name", __dirname);
  console.log("Complete Path", __dirname, "/views/home.html");
  res.sendFile(__dirname + "/views/home.html");
});

app.listen(3000, () => {
  console.log("server is running at port http://localhost:3000");
}); */

//? if it is in diff folder than we can write like this and use res.sendFile because we are sending html file instead res.send
// res.sendFile(path.join(__dirname, "../", "views", "home.html"));

//* why we use path.join in express js
// path.join is used to create a full path to a file or directory
// it takes multiple arguments and joins them together with the appropriate directory separator for the current operating system
// it is more efficient and less error-prone than using string concatenation to build file paths
//? example
/* const filePath = path.join(__dirname, "views", "home.html");
console.log( "filepath is: ",filePath); // output: /Users/username/project/views/home.html */

//! Different between path file
// console.log("Complete Path", __dirname, "/views/home.html");
// const filePath = path.join(__dirname, "views", "home.html");

//* they both are giving same result then which one we can use
//? The first version is just for display/debugging, while the second version creates an actual usable filesystem path that will work correctly in your application.

// means path.join version is correctly to use in our application.

//! File Helper
//* [alternative methods of path where we write path in a const variable and we can use it anywhere in our code]
//? creating a utils folder and  simple html file

/* // core module
const path = require("path");
module.exports = path.dirname(require.main.filename);

// local module
const rootDir = require("../Express_js");

userRouter.get("/", (req, res, next) => {
  console.log("File Helper", req.url, req.method);
  res.sendFile(path.join(rootDir, "utils", "simple.html"));
});
 */

//! Serving Static Files
//* if we want to add css or image or any pdf so we have to put that in "public" folder , because without public folder we cant access that static files ok
//? we are putting files in public because we clearing our intent that public folder is accessible from outside [by-default nothing is accessible from outside but we are making public by putting in public folder]
//* and for that we have to use one middleware called -"express.static"----------- "[app.use(express.static("public"));]"
