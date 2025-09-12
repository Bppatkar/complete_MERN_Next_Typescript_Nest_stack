import bookService from '../services/bookService.js';

async function addBook(req, res) {
  try {
    const { title, publishedDate, authorId } = req.body;
    const book = await bookService.addBook(
      title,
      new Date(publishedDate),
      authorId
    );
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: e.message });
  }
}
async function getAllBooks(req, res) {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
}
async function getBookById(req, res) {
  try {
    const book = await bookService.getBookById(parseInt(req.params.id));

    if (!book) {
      res.status(400).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: e.message });
  }
}
async function updateBook(req, res) {
  try {
    const { title } = req.body;
    const book = await bookService.updateBook(parseInt(req.params.id), title);

    res.json(book);
  } catch (error) {
    res.status(400).json({ error: e.message });
  }
}
async function deleteBook(req, res) {
  try {
    await bookService.deleteBook(parseInt(req.params.id));
    res.json({ message: `Deleted book with id ${req.params.id}` });
  } catch (error) {
    res.status(400).json({ error: e.message });
  }
}

export { addBook, getAllBooks, getBookById, updateBook, deleteBook };
