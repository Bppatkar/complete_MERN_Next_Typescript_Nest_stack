//! MONGODB
//? 1) MongoDB is the product and the company that builds it.
//* 2) The name comes from the word "Humongous."
//? 3) NoSQL Document Database: Stores data in flexible, JSON-like documents.
//* 4) Dynamic Schema: Allows fields to vary across documents without predefined schemas.
//? 5) High Performance: Optimized for fast read and write operations.
//* 6) Scalability: Supports horizontal scaling through sharding.
//? 7) High Availability: Provides replication with automatic failOver.
//* 8) Rich Query Capabilities: Offers powerful querying, indexing, and aggregation.
//? 9) Geospatial and Text Search: Includes support for location-based and full-text queries.
//* 10) Cross-Platform Compatibility: Works with various operating systems and programming languages.
//? 11) Easy Integration: Integrates smoothly with modern development stacks.


//! Mongoose

//? Mongoose is an Object Data Modeling (ODM) library for MongoDB and node js, 
//* providing a schema-based solution to model application data.
//?  Simplifies data validation and type casting in Node.js applications.
//* Enables easy interaction with MongoDB through intuitive methods
//? Supports Middleware for pre and post- processing of data
//* Helps manage relationships between data with built-in functions.


//! Cookies & Sessions

//**
// what are cookies
// Adding login functionality
// checking login state
// using a cookie
// define the logout feature
// problem with cookies
// what are sessions
// installing session package
// creating a sessions
// saving session in DB */


//! Cookies
//? Cookies are small pieces of data stored in the user's browser by server
//* They help website remember user information and preferences between page loads or visit
//? They are often used for authentication and session management
//* Cookies can manage user sessions and store data for personalized experiences

/* //TODO-- npm init-y, npm i express, npm i cookie-parser, npm i express-session

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to handle sessions
app.use(session({
  secret: 'your_secret_key', // replace with a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set to true if using https
}));

app.get("/", (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`<h1>Welcome back! You've visited this page ${req.session.views} times.</h1>`);
  } else {
    req.session.views = 1;
    res.send("<h1>Welcome to the site! This is your first visit.</h1>");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); */



