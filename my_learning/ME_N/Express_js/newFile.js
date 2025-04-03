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

/*  app.use("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
 }); */
