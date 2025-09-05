import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import Redis from 'ioredis';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from './middleware/errorHandler.js';
import logger from './utils/logger.js';
import { connectToRabbitMQ, consumeEvent } from './utils/rabbitmq.js';
import searchRoutes from './routes/search-routes.js';
import {
  handlePostCreated,
  handlePostDeleted,
} from './eventHandlers/search-event-handlers.js';
import { RateLimiterRedis } from 'rate-limiter-flexible';


const app = express();
const PORT = process.env.PORT || 3004;

const redisClient = new Redis(process.env.REDIS_URI);

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => logger.info('Connected to mongodb'))
  .catch((e) => logger.error('Mongo connection error', e));

// middleware
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

//*Homework - pass redis client as part of your req and then implement redis caching
app.use('/api/search', (req, res, next) => {
  req.redisClient = redisClient;
  next();
});

app.use('/api/search', searchRoutes);
app.use(errorHandler);

async function startServer() {
  try {
    await connectToRabbitMQ();

    //consume the events / subscribe to the events
    await consumeEvent('post.created', handlePostCreated);
    await consumeEvent('post.deleted', handlePostDeleted);

    app.listen(PORT, () => {
      logger.info(`Search service is running on port: ${PORT}`);
    });
  } catch (e) {
    logger.error('Failed to start search service', e);
    process.exit(1);
  }
}

startServer();

//unhandled promise rejection

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at', promise, 'reason:', reason);
});
