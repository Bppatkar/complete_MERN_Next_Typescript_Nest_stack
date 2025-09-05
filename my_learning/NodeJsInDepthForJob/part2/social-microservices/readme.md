# 💡 Pro Tip - Next Time Banate Time

- Pehle normal rate limit lagao har service mein
- Phir socho -> "Kya is service mein koi aisa route hai jahan zyada strict limit chahiye?"
- Agar haan -> Toh uss specific route pe sensitiveLimiter lagao

#### Example:

- Identity service → Register/login → ✅ Sensitive limiter
- Post service → Create post → ❌ Normal limiter kaafi hai
- Media service → Upload → ❌ Normal limiter kaafi hai

---

## 🔧 Rate Limiting Libraries - Different Tools

#### 1. rate-limiter-flexible → Advanced Speed Breaker

```Javascript
npm install rate-limiter-flexible
```

### Use Case: Jab tumhe bahut precise control chahiye Jaise:

- Different IPs ke liye different limits
- Different APIs ke liye different rules
- Redis mein store karna hai

#### 2. express-rate-limit → Simple Speed Breaker

```Javascript
 npm install express-rate-limit
```

### Use Case: Jab tumhe basic rate limiting chahiye Jaise:

- Simple "too many requests" message
- Easy setup
- Basic protection

#### 3. rate-limit-redis → Connector Wire

```Javascript
   npm install rate-limit-redis
```

### Use Case: Jab tum express-rate-limit ko Redis se connect karna chahte ho

---

## 🎯 SensitiveEndPointsLimiter Kahan Use Karna Hai?

### Agar kisi service mein sensitiveEndPointsLimiter use nahi ho raha, toh iska matlab woh service mein koi extra sensitive operation nahi hai jiske liye alag se strict limit chahiye.

##### Jaise:

- ✅ Identity Service → Register/login hai → Isliye sensitive limiter use kiya

- ❌ Media Service → Sirf upload/download hai → Isliye normal limiter kaafi hai

---

### 🔐 Rate Limiting - Minimal Code (Yaad Rakho) Bas 3 cheezein yaad rakho:

1. Redis Setup (Sab Services mein)

```javascript
import Redis from 'ioredis';
const redisClient = new Redis(process.env.REDIS_URI);
```

2. Normal Speed Breaker (Har Service mein)

```Javascript
import { RateLimiterRedis } from 'rate-limiter-flexible';


const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 10, // 10 requests
  duration: 1, // 1 second mein
});

// Har request pe lagao
app.use((req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => next())
    .catch(() => res.status(429).json({ message: 'Too many requests' }));
});
```

3.  Special Speed Breaker (Jahan zaroorat ho)

```Javascript
import { rateLimit } from 'express-rate-limit';

const sensitiveLimiter = rateLimit({
  windowMs: 15 _ 60 _ 1000, // 15 minutes
  max: 50, // 50 requests
  message: 'Too many attempts'
});

// Sirf specific routes pe lagao
app.use('/api/register', sensitiveLimiter);
app.use('/api/login', sensitiveLimiter);

```

---

## 🚦 Rate Limiting - Sabse Important Part

Tumhara code actually do tarah ki speed breaker lagata hai:

### 1. Fast Speed Breaker (Har Service mein)

```Javascript
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,    // Redis database use karo
  keyPrefix: 'middleware',     // Naam rakho "middleware"
  points: 10,                  // 10 requests allow karo
  duration: 1,                 // 1 second mein
});
```

#### Yehi hota hai:

- Har IP address se 1 second mein 10 se zyada requests aaye toh block
- Sab services ke paas yehi speed breaker hai
- Redis use karte hai taaki sab services same counting dekhein

### 2. Special Speed Breaker (Sensitive routes ke liye)

```Javascript
const sensitiveEndpointsLimiter = rateLimit({
    windowMs: 15 _ 60 _ 1000, // 15 minutes ka time
    max: 50, // 50 requests allow
    //... rest
});
```

#### Yehi hota hai:

- Register jaise important routes ke liye alag rule
- 15 minutes mein 50 se zyada attempts => block

---

# 🔐 Identity Service - Security Guard

### Yeh specially register/login ke liye extra protection deta hai:

```javascript
app.use('/api/auth/register', sensitiveEndpointsLimiter);
```

- Taaki koi bhi 15 minute mein 50 se zyada signup na kar sake
- Hackers ko rokne ke liye

---

# 🐇 RabbitMQ vs amqplib - Message Passing Guide

## Overview

Understanding the difference between RabbitMQ and amqplib, along with practical rate limiting and microservices communication strategies.

## 🏢 RabbitMQ vs amqplib

### **RabbitMQ** → **Post Office System**

- Ek complete message system
- Alag service hai jo chalti rehti hai
- Tumhe install karna padta hai separately

### **amqplib** → **Postman**

- Node.js library jo RabbitMQ se baat karti hai
- Tumhara code postman ki tarah kaam karta hai

## 📦 Installation

```bash
# Tumhe dono chahiye
npm install amqplib          # Node.js library
# Aur separately RabbitMQ install karo system pe
```

## 🎯 Practical Use Cases - Kaun Kahan Use Karein

### **Identity Service** (Login/Register) → Strict Chahiye

```javascript
// rate-limiter-flexible + Redis → Precise control
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 10,
  duration: 1,
});
```

### **API Gateway** → Basic Protection

```javascript
// express-rate-limit → Simple hai
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
```

### **Microservices Communication** → Messages

```javascript
// amqplib → Services aapas mein baat karein
import amqplib from 'amqplib';
const connection = await amqplib.connect('amqp://localhost');
```

## 📦 Installation Guide - Step by Step

### 1. **Basic Rate Limiting** (Simple Project)

```bash
npm install express-rate-limit
```

### 2. **Advanced Rate Limiting** (Production Project)

```bash
npm install rate-limiter-flexible ioredis
```

### 3. **Microservices Communication**

```bash
npm install amqplib
# Aur separately system pe RabbitMQ install karo
```



## 💡 Recommendations - Naya Project Banate Time

### **Start with:**

```bash
npm install express-rate-limit
```

### **Agar advanced chahiye toh:**

```bash
npm install rate-limiter-flexible ioredis
```

### **Agar microservices communication chahiye:**

```bash
npm install amqplib
# Aur RabbitMQ install karo
```

## 🎓 Simple Analogy - Yaad Rakho

- **express-rate-limit** → Basic car ki speed breaker
- **rate-limiter-flexible** → F1 car ka advanced speed control
- **amqplib** → Postman jo messages deliver karta hai
- **RabbitMQ** → Post office jahan messages store hote hain

## ❓ Frequently Asked Questions

### **Q: Kya `rate-limiter-flexible` aur `express-rate-limit` ek saath use kar sakte hain?**

A: Haan! Par usually ek hi kaafi hota hai.

### **Q: Kya `amqplib` ke bina RabbitMQ use kar sakte hain?**

A: Nahi! `amqplib` needed hai RabbitMQ se baat karne ke liye.

### **Q: Kya Redis ke bina rate limiting kar sakte hain?**

A: Haan! Memory mein bhi kar sakte ho, par Redis better hai multiple services ke liye.

## 🚀 Quick Start Examples

### Basic Rate Limiting Setup

```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

### Advanced Rate Limiting with Redis

```javascript
const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');

const redisClient = new Redis();

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 5, // Number of points
  duration: 1, // Per second(s)
});
```

### RabbitMQ Connection Setup

```javascript
const amqp = require('amqplib');

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'task_queue';
    await channel.assertQueue(queue, { durable: true });

    return { connection, channel };
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}
```
