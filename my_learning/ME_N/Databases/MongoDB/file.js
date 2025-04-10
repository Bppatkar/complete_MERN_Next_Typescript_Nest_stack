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
// _____________________________________________


//! Mongoose

//? Mongoose is an Object Data Modeling (ODM) library for MongoDB and node js,
//* providing a schema-based solution to model application data.
//?  Simplifies data validation and type casting in Node.js applications.
//* Enables easy interaction with MongoDB through intuitive methods
//? Supports Middleware for pre and post- processing of data
//* Helps manage relationships between data with built-in functions.
// _____________________________________________

//! Cookies & Sessions
//? notes of jonas [https://medium.com/@DanielJWagener/express-authentication-and-security-dac99e6b33c]

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
// _____________________________________________

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
// _____________________________________________

//! Problem with cookies
//[If we provide proper login credentials, the browser will create a cookie and we’ll be able to see our JWT on res.data.token. We want to be able to use this cookie for authorization.(To read cookies, we’ll install a package called cookie-parser,app.use(cookieParser());)]
//? Cookies can be intercepted or stolen, posing security risks.
//* They have limited storage capacity (about 4KB).
//? Users can delete or modify cookies, leading to data loss or tampering.
//* Data in cookies is not encrypted, making sensitive information vulnerable.
//? Storing important info in cookies exposes it to client-side attacks.
// _____________________________________________

//!Solution
//!Sessions

//? Sessions are server-side storage mechanism that tracks user interactions with a website [stored in client side called cookies and stored in server side call sessions]
//* They maintain user state and data across multiple requests in a web application
//? Sessions enable persistent user experiences by maintaining state between the client and server over stateless HTTP.
// _____________________________________________

``` Story
//! Part 1: Cookies – "Bhaiya, Yaad Rakho Na!"
Problem: HTTP stateless hai (har request naya aadmi lagta hai server ko).
Solution: Cookies!

User: "Login kiya, par dusri page pe jaate hi server bhool gaya? 😠"

Server: "Thik hai bhai, tere browser ko ek cookie deta hoon (user_id=123). Agli baar dikhana!"

User: "Accha, ab har baar request ke saath ye cookie bhejunga. Server ko yaad rahega!"

Dikkat:

Hacker: evil laugh "Cookie churake user_id=123 kar dunga! Pura account mera!" (🚨 Security Risk!)

Server: "Arey! Cookie mein direct userID daala? Galat hai yaar!"

//! Part 2: Sessions – "Server Ki Secret Diary"
Solution: Cookie mein session_id (random string), aur server apne paas data store karega.

Server: "Ab cookie mein sirf session_id=abc123 bhejta hoon. Actual data (user_id=123) toh meri diary (database) mein hai!"

Hacker: "Cookie churai, par session_id=abc123 ka kya karunga? Server ke paas hi data hai!" 😑

Dikkat:

Server: "Lekin lakhon users hai... har kisi ka session store karna padega. Database bhari padi hai!" (💸 Scalability Issue)

Microservices: "Hum alag-alag servers pe hai, session data share kaise karenge?!"

//! Part 3: JWT – "Token Wala Magic"
Solution: Self-contained JWT token (signature wala).

Server: "Ab session_id ki jagah JWT bhejta hoon. Isme tumhara data + signature hai. Khud verify kar lena!"

Example JWT: eyJhbGci... (encoded JSON: {user_id:123, exp:...})

Other Servers: "Humko database check karne ki zaroorat nahi! Signature verify karo, chal gaya!" 🎉

Advantage:

Stateless (no server storage).

Microservices-friendly.

Par Dikkat:

User: "Token expire nahi hua toh? Logout kaise karu?"

Server: "Token revoke nahi kar sakte easily. Diary (session) mein toh kar lete the!" 😅

Epilogue – Sabka Apna Use Case!
Cookies: Chhoti-moti cheezein (theme/language).

Sessions: Traditional websites (security + control).

JWT: APIs, mobile apps, microservices (scalability).

//! Aur Bcrypt?

Password ko seedhe store mat karo! bcrypt se hash karo, warna hacker khush ho jayega. The end! 🔐

Moral: Har technology ki ek dikkat, aur uska jugaad hota hai! 😂

```// _________________________________________________________

``` //! 1. Why do we use Cookies?
Cookies are small pieces of data stored on the client's browser. They are primarily used to:

Maintain state in HTTP (which is stateless).

Store user preferences (e.g., theme, language).

Track user behavior (e.g., analytics, ads).

Authentication: Store session IDs or tokens to identify logged-in users.

Example: When you log in to a website, a cookie may store a session_id so the server recognizes you in subsequent requests
`````` //! 2. Why use Sessions when we have Cookies?
Sessions are server-side storage mechanisms for user data, while cookies are client-side. They work together:

Cookie: Stores a unique session_id (e.g., PHPSESSID).

Session: The server uses this session_id to fetch user-specific data (e.g., user ID, permissions) from a server-side store (database, Redis, etc.).

Why not just use cookies for everything?

Cookies are sent with every HTTP request, so storing large data in them is inefficient.

Sensitive data in cookies can be tampered with (unless signed/encrypted).

Sessions keep sensitive data on the server, only exposing a reference (the session_id) via cookies.
`````` //! 3. Where does JWT come in when we have Cookies and Sessions?
JWT (JSON Web Token) is an alternative to session-based authentication. Here’s how it compares:

Feature	Sessions (with Cookies)	JWT (Token-based)
Storage	Session ID in cookie, data on server	Self-contained token (client-side)
Scalability	Needs server-side storage (harder to scale)	Stateless (easier to scale)
Use Case	Traditional web apps (server-rendered)	APIs, SPAs, microservices
How JWT Works:

User logs in → Server generates a JWT (signed, containing user data) → Sent to client (cookie or local storage).

Client sends JWT in Authorization: Bearer <token> header (or cookie).

Server verifies the JWT’s signature (no DB lookup needed).

Why JWT?

Stateless: No server-side storage.

Cross-domain friendly (useful for APIs/microservices).

Can store metadata (e.g., user roles) in the token.

Drawbacks:

Tokens cannot be easily invalidated (unlike sessions).

Larger payload than a session_id.
`````` //! 4. What about bcrypt?
bcrypt is a password-hashing function used to securely store passwords. It’s unrelated to cookies/sessions/JWT but critical for authentication.

Why bcrypt?

Salting: Adds random data to passwords before hashing (prevents rainbow table attacks).

Adaptive Cost: Can be slowed down to counter brute force.

Example Flow:

User signs up → Password is hashed with bcrypt → Stored in DB.

User logs in → Server compares hashed password with DB entry.

Without bcrypt: Storing plain-text passwords is a massive security risk!
`````` //!Summary
Summary of Relationships:
Cookies: Client-side storage for small data (e.g., session_id).

Sessions: Server-side storage, referenced by cookies.

JWT: Stateless alternative to sessions, often stored in cookies or headers.

Bcrypt: Securely hashes passwords before storage (used in auth flows).
``````//! When to Use What?
Traditional Web App: Cookies + Sessions.

API/SPA: JWT (stored in cookies or local storage).

Passwords: Always hash with bcrypt (or similar: Argon2, scrypt).
```;
// _____________________________________________

//! what is Authentication
//* 1. Authentication is the process of verifying the identity of a user or system accessing an application.

//? 2. It ensures that only authorized users can access protected resources and features.

//* 3. Authentication is crucial for security, protecting data, and providing personalized experiences in web applications.

//! what is Authorization
//? 1. Authorization is the process of determining what actions a user is permitted to perform within an application.

//* 2. It ensures that users can access only the resources and functionalities they have permission for.

//? 3. Authorization enhances security by restricting access to sensitive data and operations, complementing the authentication process.

// _____________________________________________

//! Session based authentication

//* Login Request:
//The user sends a login request to the server.

//* Session Creation:
// The server verifies the credentials, creates a session in the database, and sends a cookie (containing the session ID) back to the user.

//* Subsequent Requests:
// The user sends new requests with the session cookie.
// The server checks the database for the session ID.
// If valid, the server grants access and returns the requested content.

// _____________________________________________
















//! Implementing Authentication
//* WARNING! This part is complex, but very important to get right. If we mess up this part of the application and leak users’ data, it’s really hard to come back from that. We’ll go over how to implement authentication using no outside libraries other than JWTs.

//! JWTs
//? JSON web tokens are a stateless solution for authentication, making them perfect for REST APIs. A common alternative to JWTs is storing users’ session info on the server, but that doesn’t really fall in line with REST conventions. When the user logs in via POST request, the server sends back a JWT, which is then stored locally in the user’s browser or machine. Then, when the user accesses a protected route, the server checks the JWT like a passport to make sure it’s valid.

//! A quick overview:

//1) To prevent our database getting compromised, we need to hash passwords with bcrypt and encrypt password reset tokens with SHA 256.
//2) To prevent brute force attacks, we should make logins slow. Thankfully, bcrypt handles that for us. We should also implement rate limiting and/or maximum login attempts.
//3) To prevent against cross-site scripting (XSS) attacks, we should store JWTs in HTTPonly cookies, so that the browser can’t access or modify them. We should also sanitize user input data and set some special HTTP headers.
//4) To prevent denial-of-service (DOS) attacks, we should implement rate limiting and also limit the size of body requests. We also need to avoid “evil” regular expressions that can take a long time to run.
//5) To prevent against NoSQL query injections, we should make specific Mongoose schemas and sanitize user input data.

//* A few more practices:

//* Always use HTTPS.
//? Create random password reset tokens with expiry dates.
//* Deny access to JWT after password change.
//? Don’t commit sensitive config data to Git.
//* Don’t sent error details to clients.
//? Prevent cross-site request forgery (using the csurf package).
//* Require re-authentication before a high-value action.
//? Implement a blacklist of untrusted JWTs.
//* Confirm user email address after first creating account.
//? Keep user logged in with refresh tokens.
//* Implement two-factor authentication.
//? Prevent parameter pollution causing Uncaught Exceptions.

/* 
//! For a **MERN Stack** (MongoDB, Express, React, Node.js) project, here are the recommended authentication tools:

//* ### **Backend (Node.js + Express)**  
🔹 **`bcrypt`** – Password hashing  
🔹 **`jsonwebtoken` (JWT)** – Stateless authentication (APIs)  
🔹 **`cookie-parser`** – If using HTTP-only cookies for JWT storage  

//* ### **Frontend (React)**  
🔹 **`axios`** – API calls with JWT in headers  
🔹 **`react-router-dom`** – Protected routes  
🔹 **Context API / Redux / Zustand** – Global auth state management  

//* ### **Database (MongoDB)**  
🔹 **`mongoose`** – Store user data (email, hashed passwords)  

//* ### **Optional (Advanced Security)**  
🔹 **`helmet`** – Secure HTTP headers (Express)  
🔹 **`cors`** – Configure allowed origins  
🔹 **`express-rate-limit`** – Prevent brute-force attacks  

//* ### **🚀 Final Choice for MERN:**  
✅ **JWT + `httpOnly` Cookies** (Best for security + scalability)  
✅ **`bcrypt`** (Always for passwords)  

Avoid mixing **Sessions + JWT**—pick one. For MERN (API-driven), **JWT is standard**.  

*/
