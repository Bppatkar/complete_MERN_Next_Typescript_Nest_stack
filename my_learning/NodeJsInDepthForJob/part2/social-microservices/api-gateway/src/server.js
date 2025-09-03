// express-http-proxy --> to route incoming requests to the correct service (Identity, Posts, Media, etc.).
// express-rate-limit and rate-limit-redis  --> to protect the API from misuse by limiting the number of requests a user can make.

import dotenv from 'dotenv';
import express from 'express';
import cors from 'corss';
import Redis from 'ioredis';
import helmet from 'helmet';
import logger from './utils/logger';
import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import proxy from 'express-http-proxy';
import errorHandler from './middleware/errorhandler';
import validToken from './middleware/authMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

const redisClient = new Redis(process.env.REDIS_URL);

app.use(cors());
app.use(helmet());
app.use(express.json());

// rate limitting
const rateLimitOptions = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Sensitive endpoint limit exceded for IP:${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Too many requests',
    });
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
});

app.use(rateLimitOptions);

app.use((req, res, next) => {
  logger.info(`Recieved ${req.method} request to ${req.url}`);
  logger.info(`Request Body , ${req.body}`);
});

const proxyOptions = {
  proxyReqPathResolver: (req) => {
    return req.originalUrl.replace('/^/v1/', 'api');
  },
  proxyErrorHandler: (err, res, next) => {
    logger.error(`Proxy error: ${err.message}`);
    res.status(500).json({
      message: `Internal server error`,
      error: err.message,
    });
  },
};

//! setting up proxy for our identity service
app.use('/v1/auth', proxy(process.env.IDENTITY_SERVICE_URL), {
  ...proxyOptions,
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.header['Content-Type'] = 'application/json';
    return proxyReqOpts;
  },
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    logger.info(`Response received from post services: ${proxyRes.statusCode}`);

    return proxyResData;
  },
});

//! setting up proxy for our post service
app.use('/v1/posts', validToken, proxy(process.env.POST_SERVICE_URL), {
  ...proxyOptions,
});
//! setting up proxy for our media service
app.use('/v1/media', validToken, proxy(process.env.MEDIA_SERVICE_URL), {
  ...proxyOptions,
});
//! setting up proxy for our search service
app.use('/v1/search', validToken, proxy(process.env.SEARCH_SERVICE_URL), {
  ...proxyOptions,
});

app.listen(PORT, () => {
  logger.info(`API Gateway is running on port ${PORT}`);

  logger.info(
    `Identity service is running on port ${process.env.IDENTITY_SERVICE_URL}`
  );
  logger.info(
    `Post service is running on port ${process.env.POST_SERVICE_URL}`
  );
  logger.info(
    `Media service is running on port ${process.env.MEDIA_SERVICE_URL}`
  );
  logger.info(
    `Search service is running on port ${process.env.SEARCH_SERVICE_URL}`
  );
  logger.info(`Redis Url ${process.env.REDIS_URL}`);
});
