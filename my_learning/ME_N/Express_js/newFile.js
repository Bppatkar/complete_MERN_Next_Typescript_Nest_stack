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






