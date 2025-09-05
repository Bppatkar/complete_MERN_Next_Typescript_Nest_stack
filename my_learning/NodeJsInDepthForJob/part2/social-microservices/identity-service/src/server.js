// express-rate-limit and rate-limit-redis  --> to protect the API from misuse by limiting the number of requests a user can make.

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import logger from './utils/logger.js';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';
import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import routes from './routes/identity-services.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3001;

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => logger.info('Database Connected 🗃 🔌 🚀'))
  .catch((e) => logger.error('MongoDB Connection error', e));

const redisClient = new Redis(process.env.REDIS_URI);

// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Request body, ${JSON.stringify(req.body)}`);
  next();
});

// DDoS protection and rate limitting
//! in detail
/*
// Create a new rate limiter using Redis as the storage backend
const rateLimiter = new RateLimiterRedis({
  // Redis client instance that stores rate limit data
  // This requires Redis to be installed and running locally
  storeClient: redisClient,
  
  // Prefix added to Redis keys for rate limiting
  // Helps distinguish rate limiting data from other Redis data
  keyPrefix: 'middleware',
  
  // Maximum number of requests allowed from a single IP address
  // in the given duration period (10 requests in this case)
  points: 10,
  
  // Time window in seconds during which the points are counted
  // Here set to 1 second, meaning 10 requests allowed per second per IP
  duration: 1,
}); 
 */
//! in short
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient, // Redis client instance to store rate limit data
  keyPrefix: 'middleware', // Prefix added to Redis keys to distinguish rate limiting data
  points: 10, // Maximum number of requests allowed from a single IP in the duration period
  duration: 1, // Time window in seconds during which the points are counted (1 second)
});
app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => next())
    .catch(() => {
      logger.warn(`Rate limit exceeded for IP:${req.ip}`);
      res.status(429).json({ success: false, message: 'Too many requests' });
    });
});

// Ip based rate limitting for sensitive endpoints
const sensitiveEndpointsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Sensitive endpoint rate limit exceeded for IP:${req.ip}`);
    res.status(429).json({ message: 'Too many requests' });
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});

// apply this sensitiveEndpointsLimiter to our routes
app.use('/api/auth/register', sensitiveEndpointsLimiter);

//routes
app.use('/api/auth', routes);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Identity service running on port ${PORT}`);
});

// unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at', promise, 'reason:', reason);
});
