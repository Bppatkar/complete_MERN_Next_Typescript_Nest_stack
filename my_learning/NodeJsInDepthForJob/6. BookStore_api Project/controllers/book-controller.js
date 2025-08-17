import Book from '../models/book';

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    res.status(200).json({
      success: true,
      message: allBooks.length
        ? 'All Books Fetched Successfully 👍🏻📚'
        : 'No books found',
      data: allBooks,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch books',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

const getSingleBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book not found with id: ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book fetched successfully 👍🏻📚',
      data: book,
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch book',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

const addNewBook = async (req, res) => {
  try {
    const newBookFromData = req.body;
    const newlyCreatedBook = await Book.create(newBookFromData);
    if (newlyCreatedBook) {
      res.status(201).json({
        success: true,
        message: `New Book Created SuccessFully 👍🏻📚`,
        data: newlyCreatedBook,
      });
    } else {
      res.status(400).json({
        success: false,
        message: `Something went wrong while creating a new book`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong please try again later !!!',
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const updatedBookData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      getCurrentBookId,
      updatedBookData,
      { new: true }
    );
    if (updatedBook) {
      res.status(200).json({
        success: true,
        message: `Book Updated SuccessFully 👍🏻📚`,
        data: updatedBook,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Something went wrong while Updating a book`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong please try again later !!!',
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(getCurrentBookId);

    if (deletedBook) {
      res.status(200).json({
        success: true,
        message: `Book Deleted SuccessFully 👍🏻📚`,
        data: deletedBook,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Something went wrong while deleting a book`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong please try again later !!!',
    });
  }
};

export default {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateBook,
  deleteBook,
};
