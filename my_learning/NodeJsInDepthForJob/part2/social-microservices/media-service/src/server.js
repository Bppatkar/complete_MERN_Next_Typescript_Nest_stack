import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import mediaRoutes from './routes/media-routes.js';
import errorHandler from './middleware/errorHandler.js';
import logger from './utils/logger.js';
import { connectToRabbitMQ, consumeEvent } from './utils/rabbitmq.js';
import { handlePostDeleted } from './eventHandlers/media-event-handlers.js';

const app = express();
const PORT = process.env.PORT || 3003;
