import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product.routes.js';
import bookRoutes from './routes/book.routes.js';

const app = express();

//connect to our database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('mongodb connected successfully 🚀🚀👍🏻'))
  .catch((e) => {
    console.error('MongoDB connection error:', e.message);
    process.exit(1);
  });

//use middlewares
app.use(express.json());

app.use('/products', productRoutes);
app.use('/reference', bookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is now running on port ${process.env.PORT}`);
});
