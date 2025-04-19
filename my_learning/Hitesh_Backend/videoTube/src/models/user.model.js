/* users [icon:user] {
 id             string pk
 watchHistory   ObjectId[] videos
 userName       string
 email          string
 fullName       string
 avatar         string
 coverImage     string
 password       string
 refreshToken   string
 createdAt      Date
 updatedAt      Date
} */

//! here installing bcrypt for password hashing and JWT for generating token and refresh token
//* accessToken and refreshToken  they both are JWT token , just usecase are different of each other
//? AccessToken - we give the user for a short time, like hey just take this
//? RefreshToken - it is a longTerm token which we store in database as well, and it allows us to disable the users as well whenever we want that like , hey user you need to fresh login, so we can just this out from the database.
//? JWT is a bearer token means - whoever has this token, I'll provide data to them [in simple word - jiske pass token hai, main use data de dunga ab chahe wo user ho ya na ho i dont care]

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    // watch history is an array of video ids not object
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//! hook
// we are triggring save event before saving data into database that's why we are using pre ok
// but remember dont use arrow function here because we need context ok
userSchema.pre("save", async next => {
  // it means when password is getting modified then it will triggered not on every single change
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// comparing password [by creating own method and adding in prototype]
//! method

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//! generating shortTerm Token [short lived]
//* using JWT

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//? refresh token and access token is same... and in refresh token there is less info because it will getting refresh again and again

//! generating LongTerm Token [long lived]
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);

//! Cookies
//? Cookies are small pieces of data stored in the user's browser by server
//* They help website remember user information and preferences between page loads or visit
//? They are often used for authentication and session management
//* Cookies can manage user sessions and store data for personalized experiences

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

``` // _________________________________________________________
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

//! For a **MERN Stack** (MongoDB, Express, React, Node.js) project, here are the recommended authentication tools:

//* ### **Backend (Node.js + Express)**
// ⏩ **`bcrypt`** – Password hashing
// ⏩ **`jsonwebtoken` (JWT)** – Stateless authentication (APIs)
// ⏩ **`cookie-parser`** – If using HTTP-only cookies for JWT storage

//* ### **Frontend (React)**
// ⏩ **`axios`** – API calls with JWT in headers
// ⏩ **`react-router-dom`** – Protected routes
// ⏩ **Context API / Redux / Zustand** – Global auth state management

//* ### **Database (MongoDB)**
// ⏩ **`mongoose`** – Store user data (email, hashed passwords)

//* ### **Optional (Advanced Security)**
// ⏩ **`helmet`** – Secure HTTP headers (Express)
// ⏩ **`cors`** – Configure allowed origins
// ⏩ **`express-rate-limit`** – Prevent brute-force attacks

//* ### **🚀 Final Choice for MERN:**
// ✅ **JWT + `httpOnly` Cookies** (Best for security + scalability)
// ✅ **`bcrypt`** (Always for passwords)

// Avoid mixing **Sessions + JWT**—pick one. For MERN (API-driven), **JWT is standard**.
