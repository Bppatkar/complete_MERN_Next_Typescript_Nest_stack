import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import Redis from 'ioredis';
import RedisStore from 'rate-limit-redis';
import cors from 'cors';
import helmet from 'helmet';
import postRoutes from './routes/post-routes.js';
import errorHandler from './middlewares/errorHandler.js';
import logger from './utils/logger.js';
import { connectToRabbitMQ } from './utils/rabbitmq.js';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { rateLimit } from 'express-rate-limit';
import { authenticateRequest } from './middlewares/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3002;

const redisClient = new Redis(process.env.REDIS_URI);

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => logger.info('Connected to mongodb'))
  .catch((e) => logger.error('Mongo connection error', e));

//middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Request body: ${JSON.stringify(req.body)}`);
  next();
});

//*implementing Ip based rate limiting for sensitive endpoints
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

// Apply authentication to all post routes
app.use('/api/posts', authenticateRequest);

//routes -> pass redisclient to routes
app.use(
  '/api/posts',
  (req, res, next) => {
    req.redisClient = redisClient;
    next();
  },
  postRoutes
);

app.use(errorHandler);

async function startServer() {
  try {
    await connectToRabbitMQ();
    app.listen(PORT, () => {
      logger.info(`Post service running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to connect to server', error);
    process.exit(1);
  }
}

startServer();

//unhandled promise rejection

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at', promise, 'reason:', reason);
});
