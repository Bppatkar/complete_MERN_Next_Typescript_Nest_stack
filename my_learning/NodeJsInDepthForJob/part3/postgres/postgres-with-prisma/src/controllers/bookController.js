import bookService from '../services/bookService.js';

async function addBookController(req, res) {
  try {
    const { title, publishedDate, authorId } = req.body;
    const book = await bookService.addBook(
      title,
      new Date(publishedDate),
      authorId
    );

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function getAllBooksController(req, res) {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getBookByIdController(req, res) {
  try {
    const book = await bookService.getBookById(parseInt(req.params.id));

    if (!book) {
      res.status(400).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function updateBookController(req, res) {
  try {
    const { title } = req.body;
    const book = await bookService.updateBook(parseInt(req.params.id), title);

    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function deleteBookController(req, res) {
  try {
    await bookService.deleteBook(parseInt(req.params.id));
    res.json({ message: `Deleted book with id ${req.params.id}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const bookController = {
  addBook: addBookController,
  getAllBooks: getAllBooksController,
  getBookById: getBookByIdController,
  updateBook: updateBookController,
  deleteBook: deleteBookController,
};

export { bookController };
