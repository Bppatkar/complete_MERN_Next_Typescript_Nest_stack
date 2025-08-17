import dotenv from 'dotenv';
dotenv.config();
import connectDB from './database/db.js';
import bookRoutes from './routes/book-routes.js';

import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;

// database connection
connectDB();

//middleware -> express.json()
app.use(express.json());

// routing
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
