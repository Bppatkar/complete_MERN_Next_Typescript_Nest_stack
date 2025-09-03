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
