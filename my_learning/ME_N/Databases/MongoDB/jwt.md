# Complete JWT Authentication Guide for Express.js 🔐

This comprehensive guide covers everything from basic JWT setup to advanced implementations in Express.js.

## 1. Basic Setup

### Installation

```bash
npm install express jsonwebtoken cookie-parser
```

### Minimal Express Server with JWT

```javascript
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());

const SECRET_KEY = "your-very-secure-secret-key";

app.get("/", (req, res) => {
  res.send(`
    <h1>JWT Demo</h1>
    <a href="/login">Login</a> |
    <a href="/protected">Protected Route</a> |
    <a href="/logout">Logout</a>
  `);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

## 2. JWT Operations

### Creating Tokens

```javascript
app.post("/login", (req, res) => {
  // Authentication logic here
  const user = { id: 123, username: "john_doe", role: "user" };

  const token = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });

  // Set as HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000, // 1 hour
  });

  res.json({ message: "Logged in successfully!" });
});
```

### Verifying Tokens

```javascript
// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Protected route
app.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: "Protected data", user: req.user });
});
```

### Logging Out

```javascript
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully!" });
});
```

## 3. Advanced JWT Configuration

### Refresh Tokens

```javascript
// Generate refresh token (long-lived)
app.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  jwt.verify(refreshToken, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const newToken = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "15m" }
    );

    res.cookie("token", newToken, { httpOnly: true });
    res.json({ token: newToken });
  });
});
```

### JWT Options

| Option    | Description        | Recommended Value |
| --------- | ------------------ | ----------------- |
| expiresIn | Token lifetime     | 15m, 1h, 7d       |
| algorithm | Hashing algorithm  | HS256 (default)   |
| issuer    | Token issuer       | Your domain name  |
| audience  | Intended recipient | Client app name   |

## 4. Best Practices

- ✔ Always use HTTPS for JWT transmission
- ✔ Set reasonable expiration times (15-30 mins for access tokens)
- ✔ Store tokens securely (HTTP-only cookies recommended)
- ✔ Use strong secret keys (32+ characters)
- ✔ Implement refresh token rotation
- ✔ Blacklist compromised tokens

## 5. Common Issues & Fixes

| Issue               | Solution                           |
| ------------------- | ---------------------------------- |
| Token not verifying | Check secret key and algorithm     |
| Expired token       | Implement refresh tokens           |
| Missing token       | Verify cookie/header is being sent |
| Invalid signature   | Ensure consistent secret key       |

## 6. Real-World Examples

### Role-Based Access

```javascript
function authorize(roles = []) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.sendStatus(403);
    }
    next();
  };
}

// Admin-only route
app.get("/admin", authenticateJWT, authorize(["admin"]), (req, res) => {
  res.json({ message: "Admin dashboard" });
});
```

### Token in Authorization Header

```javascript
// Alternative middleware for header tokens
const authHeader = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
```

## 7. JWT vs Sessions vs Cookies

| Feature     | JWT                 | Sessions             | Cookies      |
| ----------- | ------------------- | -------------------- | ------------ |
| Storage     | Client-side         | Server-side          | Client-side  |
| Scalability | Stateless           | Needs store          | Limited      |
| Security    | Signed/Encrypted    | Session ID           | Plain/Signed |
| Best For    | APIs, Microservices | Traditional web apps | Small data   |

## Final Notes

- 🔥 JWT is ideal for modern stateless applications
- 🔒 Always sign and verify tokens properly
- ⚡ For SPAs/APIs, JWT is often better than sessions
- 🛡️ Implement proper token invalidation for security
