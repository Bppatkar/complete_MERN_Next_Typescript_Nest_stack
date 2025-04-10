# CORS Management (Cross-Origin Resource Sharing)

## Why?
- Allows controlled access to resources from different origins (domains)
- Prevents unauthorized cross-origin requests
- Essential for APIs consumed by frontend applications

## Implementation

### Installation
```bash
npm install cors
```

### Basic Setup (Allow All)
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());
```

### Advanced Configuration
```javascript
const corsOptions = {
  origin: [
    'https://yourdomain.com',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Enable cookies in CORS
  maxAge: 86400 // Cache CORS preflight for 24 hours
};

app.use(cors(corsOptions));
```

### Route-Specific CORS
```javascript
app.get('/public-data', cors(), (req, res) => {
  res.json({ data: 'Publicly accessible' });
});

app.post('/private-data', cors(corsOptions), (req, res) => {
  res.json({ data: 'Restricted access' });
});
```

## Common Errors & Fixes
| Error | Solution |
|-------|----------|
| CORS policy blocked | Verify allowed origins match request origin |
| Preflight failures | Ensure OPTIONS method is handled |
| Credentials not sent | Set `credentials: true` and configure frontend |

## Real-World Examples

### 🔐 Login System

```javascript
app.post('/login', (req, res) => {
  // Authentication logic
  res.json({ message: 'Login successful' });
});

app.get('/dashboard', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json({ message: 'Welcome to the dashboard' });
});
```   
}

### 📦 Inventory Management

```javascript
app.get('/inventory', (req, res) => {
  res.json({ items: ['Product A', 'Product B', 'Product C'] });
});
``` 

### 📊 Analytics Dashboard

```javascript
app.get('/analytics', (req, res) => {
  res.json({ data: [1, 2, 3, 4, 5] });
});
```

## 🛠️ Common Issues & Fixes

| Issue                    | Solution                                  |  
|--------------------------|-------------------------------------------|  
| CORS policy blocked      | Verify allowed origins match request origin|  
| Preflight failures       | Ensure OPTIONS method is handled          |  
| Credentials not sent     | Set `credentials: true` and configure frontend|  
| CORS not setting         | Verify secure setting matches environment |  
| CORS data lost           | Ensure proper error handling in store     |  

