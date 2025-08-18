import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log('Database Connected Succesfully 🚀');
  } catch (error) {
    console.error('MongoDB connection is failed', error);
    process.exit(1);
  }
};

export default connectDb;
