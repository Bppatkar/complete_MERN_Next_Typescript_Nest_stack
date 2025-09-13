import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authorRoutes from './routes/authorRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import promClient from 'prom-client';

const app = express();

app.use(express.json());

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestCounter = new promClient.Counter({
  name: 'http_request_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

register.registerMetric(httpRequestCounter);

// middleware to track API requests
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: req.status,
    });
  });
  next();
});

// Expose the metrcs endpoint for prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-type', register.contentType);
  res.end(await register.metrics());
});

app.use('/api/author', authorRoutes);
app.use('/api/book', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is now running on http://localhost:${PORT}`)
);
