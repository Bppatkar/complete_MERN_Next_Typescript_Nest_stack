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

/** //?-- npm init-y, npm i express, npm i cookie-parser, npm i express-session and npm i bcrypt*/

//TODO LOGIN & LOGOUT with cookies and sessions

/* const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

// In-memory "database" (use a real database in production)
let users = [];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: "Bpp12345",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if using https
  })
);
// Middleware to log session data
app.use((req, res, next) => {
  console.log("Session ID:", req.sessionID); // Logs the session ID
  console.log("Session Data:", req.session); // Logs the entire session
  next();
});

//Routes
app.get("/", (req, res) => {
  res.send(`
    <h1>Home Page</h1>
    <a href="/profile"><h3>Profile</h3></a>
    <a href="/register"><h3>Register</h3></a>
    <a href="/login-page"><h3>Login</h3></a>
    <a href= "/logout"><h3>Logout</h3></a> `);
});

// Registration Form
app.get("/register", (req, res) => {
  res.send(`
    <h1>Register</h1>
    <form action="/register" method="POST">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Register</button>
    </form>
    <a href="/"><button>Back to Home</button></a>
  `);
});

// Registration Handler
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // check if user already exist [searching in array we created upper]
  if (users.some((u) => u.username === username)) {
    return res.status(400).send("Username already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //creating new user

  const newUser = {
    id: Date.now().toString(),
    username,
    password: hashedPassword,
  };
  users.push(newUser);
  res.send(`
    <p>Registration successful!</p>
    <a href="/login-page"><button>Login Now</button></a>
    `);
});

// Login page route
app.get("/login-page", (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
    <a href="/"><button>Back to Home</button></a>
  `);
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).send(`
      <p>Invalid username</p>
      <a href="/login-page"><button>Try Again</button></a>
    `);
  }

  // check password

  const isPassMatch = bcrypt.compare(password, user.password);

  if (isPassMatch) {
    req.session.user = { id: user.id, username: user.username };
    res.send(`
      <p>Login successful!</p>
      <a href="/profile"><button>View Profile</button></a>
    `);
  } else {
    res.status(401).send(`
      <p>Invalid password</p>
      <a href="/login-page"><button>Try Again</button></a>
    `);
  }
});

// Protected route
app.get("/profile", (req, res) => {
  if (req.session.user) {
    res.send(`<h1>Welcome, ${req.session.user.username}</h1>
      <a href="/"><button>Back to Home</button></a>
      <a href="/logout"><button>Logout</button></a>`);
  } else {
    res.status(401).send(`
      <p>Unauthorized - Please login first</p>
      <a href="/register"><button>Register</button></a>
      <a href="/"><button>Back to Home</button></a>
      `);
  }
});

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.clearCookie("connect.sid");
    res.send(`
        <p>Logged out successfully</p>
        <a href="/"><button>Back to Home</button></a>
      `);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 */










