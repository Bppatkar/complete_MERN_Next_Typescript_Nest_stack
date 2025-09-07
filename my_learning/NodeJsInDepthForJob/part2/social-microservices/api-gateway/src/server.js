// express-http-proxy --> to route incoming requests to the correct service (Identity, Posts, Media, etc.).
// express-rate-limit and rate-limit-redis  --> to protect the API from misuse by limiting the number of requests a user can make.

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import Redis from 'ioredis';
import helmet from 'helmet';
import logger from './utils/logger.js';
import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import proxy from 'express-http-proxy';
import errorHandler from './middleware/errorhandler.js';
import validToken from './middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

const redisClient = new Redis(
  process.env.REDIS_URI || 'redis://localhost:6379'
);

app.use(cors());
app.use(helmet());
app.use(express.json());

// rate limitting [very basic rate limit but for advanced we use rate-limitter-flexible]
const rateLimitOptions = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP:${req.ip}`);
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
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Request Body: ${JSON.stringify(req.body)}`);
  next();
});

//! setting up proxy for our identity service [to route incoming requests to the correct service]
//! how to set proxy [go npm package and search these two] --> 1.proxyReqPathResolver and 2. proxyErrorHandler
const proxyOptions = {
  proxyReqPathResolver: (req) => {
    return req.originalUrl.replace(/^\/v1/, '/api');
    // it will replace v1 from api --> localhost:3000/v1/auth/register ===> to===> localhost:3000/api/auth/register
  },
  proxyErrorHandler: (err, res, next) => {
    logger.error(`Proxy error: ${err.message}`);
    res.status(500).json({
      message: `Internal server error`,
      error: err.message,
    });
  },
};

//! setting up proxy for authentication routes/Identity services
//*** skeleton
/*
app.use('/v1/auth', validToken [if needed], proxy(process.env.POST_SERVICE_URL, {
  ...proxyOptions, //? destructuring the proxy options [above created object]
  //? these options will allow customisation of proxy request before sent to the target
  //? for more detail go npm search expres-http-proxy --> search [proxyReqOptDecorator]
  //! Request [adding any imp thing in request and sent to user]
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers['Content-Type'] = 'application/json';
      return proxyReqOpts;},
  //! Response [getting response back from user]
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    logger.info(`Response received from Identity service : ${proxyRes.statusCode}`);
    return proxyResData;
  },
})); 
 */
app.use(
  '/v1/auth',
  //? it will replace v1/auth from api --> localhost:3000/v1/auth/register ===> to ===> localhost:3000/api/auth/register
  proxy(process.env.IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers['Content-Type'] = 'application/json';
      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from Identity service: ${proxyRes.statusCode}`
      );
      return proxyResData;
    },
  })
);

//! setting up proxy for our post service
app.use(
  '/v1/posts',
  validToken,
  proxy(process.env.POST_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers['Content-Type'] = 'application/json';
      proxyReqOpts.headers['x-user-id'] = srcReq.user.userId;

      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from Post service : ${proxyRes.statusCode}`
      );
      return proxyResData;
    },
  })
);
//! setting up proxy for our media service
app.use(
  '/v1/media',
  validToken,
  proxy(process.env.MEDIA_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers['x-user-id'] = srcReq.user.userId;

      if (!srcReq.headers['content-type'].startsWith('multipart/form-data')) {
        proxyReqOpts.headers['Content-Type'] = 'application/json';
      }
      return proxyReqOpts;
    },

    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from Media service : ${proxyRes.statusCode}`
      );
      return proxyResData;
    },
    parseReqBody: false, // Added for better file upload handling [that line will ensure that entire request body is proxied for the file upload also]
  })
);
//! setting up proxy for our search service
app.use(
  '/v1/search',
  validToken,
  proxy(process.env.SEARCH_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers['Content-Type'] = 'application/json';
      proxyReqOpts.headers['x-user-id'] = srcReq.user.userId;

      return proxyReqOpts;
    },

    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from Search service : ${proxyRes.statusCode}`
      );
      return proxyResData;
    },
  })
);

app.use(errorHandler);

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
  logger.info(`Redis Url ${process.env.REDIS_URI}`);
});
