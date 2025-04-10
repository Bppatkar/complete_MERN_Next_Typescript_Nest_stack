# 🍪 Complete Cookies Guide for Express.js

This guide covers everything from basic cookie handling to advanced implementations in a single, comprehensive file.

---

## 1. Basic Setup

### 📆 Installation

```bash
npm install express cookie-parser
```

### 🛠️ Minimal Express Server with Cookies

```javascript
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser()); // Enable cookie middleware

app.get('/', (req, res) => {
  res.send(`
    <h1>Cookie Demo</h1>
    <a href="/set">Set Cookie</a> |
    <a href="/get">Get Cookie</a> |
    <a href="/delete">Delete Cookie</a>
  `);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

---

## 2. Cookie Operations

### ✅ Setting Cookies

```javascript
app.get('/set', (req, res) => {
  res.cookie('username', 'john_doe', {
    maxAge: 15 * 60 * 1000, // 15 minutes
    httpOnly: true,         // Block client-side JS access
    secure: true,           // HTTPS only
    sameSite: 'lax'         // CSRF protection
  });
  res.send('Cookie set successfully! 🍪');
});
```

### 📅 Reading Cookies

```javascript
app.get('/get', (req, res) => {
  const username = req.cookies.username;
  res.send(username ? `Welcome back, ${username}!` : 'No cookie found ❌');
});
```

### 🗑️ Deleting Cookies

```javascript
app.get('/delete', (req, res) => {
  res.clearCookie('username');
  res.send('Cookie deleted! 🗑️');
});
```

---

## 3. Advanced Cookies

### 🔐 Signed Cookies (Tamper-Proof)

```javascript
app.use(cookieParser('your-secret-key')); // Add secret key

app.get('/set-secure', (req, res) => {
  res.cookie('session', 'encrypted_data', { signed: true });
  res.send('Signed cookie set! 🔒');
});

app.get('/get-secure', (req, res) => {
  const session = req.signedCookies.session;
  res.send(session ? `Session: ${session}` : 'Invalid cookie! ⚠️');
});
```

---

## ⚙️ Cookie Options

| Option     | Description          | Example                           |
|------------|----------------------|-----------------------------------|
| `maxAge`   | Lifetime (in ms)     | `maxAge: 900000` (15 minutes)     |
| `expires`  | Expiry date          | `expires: new Date('2025-12-31')` |
| `httpOnly` | Block JS access      | `httpOnly: true`                  |
| `secure`   | HTTPS only           | `secure: true`                    |
| `domain`   | Domain scope         | `domain: '.example.com'`          |
| `path`     | URL path             | `path: '/admin'`                  |
| `sameSite` | CSRF protection      | `sameSite: 'strict'`              |

---

## ✅ Best Practices

- ✔ Always use `httpOnly` for sensitive cookies  
- ✔ Enable `secure: true` in production  
- ✔ Sign important cookies with `cookieParser('secret')`  
- ✔ Set reasonable expiration using `maxAge` or `expires`  
- ✔ Use `sameSite` to prevent CSRF attacks  

---

## 🛠️ Common Issues & Fixes

| Issue                    | Solution                            |
|--------------------------|-------------------------------------|
| Cookie not setting       | Check `res.cookie()` syntax         |
| Cookie not persisting    | Verify `maxAge` or `expires`        |
| Secure cookie fails dev  | Set `secure: false` locally         |
| Can't read cookie        | Ensure `cookieParser()` is applied  |

---

## 🧪 Real-World Examples

### 🔐 Login System

```javascript
app.post('/login', (req, res) => {
  // After successful authentication
  res.cookie('auth_token', 'xyz123', {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
  });
  res.redirect('/dashboard');
});
```

### 🎨 Theme Preference

```javascript
app.post('/set-theme', (req, res) => {
  res.cookie('theme', req.body.theme, {
    maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
  });
  res.send('Theme updated!');
});
```

---

## 🧠 Final Notes

- 🚀 Cookies are essential for sessions, auth, and personalization  
- 🔒 Security matters – always sign and protect sensitive cookies  
- ⚡ Alternatives: For modern apps, consider JWT + HttpOnly cookies  

---

