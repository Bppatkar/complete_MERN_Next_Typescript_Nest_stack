import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { configureCors } from './config/corsConfig';
import { requestLogger, addTimeStamp } from './middleware/customMiddleware';
import { globalErrorhandler } from './middleware/errorHandler';
import { urlVersoining } from './middleware/apiVersioning';
import { createBasicRateLimiter } from './middleware/rateLimiting';
import itemRoutes from './routes/item-routes';

const app = server();
const PORT = process.env.PORT || 1234;

// express json middleware
app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(createBasicRateLimiter(2, 15 * 60 * 1000)); // 100 request per 15 minutes
app.use(express.json());

app.use(urlVersoining('v1'));
app.use('api/v1', itemRoutes);

app.use(globalErrorhandler);

app.listen(PORT, () => {
  console.log(`Server is live now on port http://localhost/${PORT}`);
});
