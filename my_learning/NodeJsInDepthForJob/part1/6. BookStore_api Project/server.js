import dotenv from 'dotenv';
dotenv.config();
import connectDB from './database/db.js';

import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;

// database connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
