import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: 'String',
      require: [true, 'Book Title is required'],
      trim: true,
      maxLength: [100, 'Book title can not be more than 100 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Publication year is required'],
      min: [1000, 'Year must be atleast 1000'],
      max: [new Date().getFullYear(), 'Year cannot be in the future'],
    },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', BookSchema);
