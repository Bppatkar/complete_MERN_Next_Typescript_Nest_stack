import Author from '../models/Author.model.js';
import Book from '../models/Book.model.js';

const createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;

    const existingAuthor = await Author.findOne({ name: name.trim() });
    if (existingAuthor) {
      return res.status(409).json({
        success: false,
        message: 'Author with this name already exists',
        data: existingAuthor,
      });
    }

    const author = await Author.create({
      name,
      bio,
    });

    res.status(201).json({
      success: true,
      message: 'Author created Successfully',
      data: author,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Some error occured',
    });
  }
};
const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Some error occured',
    });
  }
};
const getBookWithAuthor = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author'); // provide bookid
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found!',
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Some error occured',
    });
  }
};

export { createAuthor, createBook, getBookWithAuthor };
