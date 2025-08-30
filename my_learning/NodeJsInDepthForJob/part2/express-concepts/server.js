import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { configureCors } from './config/corsConfig.js';
import { requestLogger, addTimeStamp } from './middleware/customMiddleware.js';
import { globalErrorhandler } from './middleware/errorHandler.js';
import { urlVersoining } from './middleware/apiVersioning.js';
import { createBasicRateLimiter } from './middleware/rateLimiting.js';
import itemRoutes from './routes/item-routes.js';

const app = express();
const PORT = process.env.PORT || 1234;

// express json middleware
app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());

// app.use(createBasicRateLimiter(5, 15 * 60 * 1000)); // 5 request per 15 minutes
app.use(createBasicRateLimiter(1000, 15 * 60 * 1000)); // 1000 requests per 15 minutes
app.use(express.json());

app.use(urlVersoining('v1'));
app.use('/api/v1', itemRoutes);

app.use(globalErrorhandler);

app.listen(PORT, () => {
  console.log(`Server is live now on port http://localhost:${PORT}`);
});
