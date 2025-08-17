import express from 'express';

const app = express();

// middleware [and it return middleare that only parses json and only look at requests where the Content-Type header matches the type option, which is 'application/json'.]
app.use(express.json());

let books = [
  {
    id: '1',
    title: 'Book 1',
  },
  {
    id: '2',
    title: 'Book 2',
  },
  {
    id: '3',
    title: 'Book 3',
  },
  {
    id: '4',
    title: 'Book 4',
  },
];

// intro route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to our bookstore api',
  });
});

// get all books
app.get('/books', (req, res) => {
  res.json({
    message: 'All Books Fetch SuccessFully 🚀',
    data: books,
  });
});

// get single book
app.get('/books/:bookId', (req, res) => {
  const { bookId } = req.params;
  // console.log(bookId);
  const book = books.find((book) => book.id === req.params.bookId);
  if (book)
    res.status(200).json({
      message: ' We Fetched your Book',
      data: book,
    });
  else {
    res.status(404).json({
      message: 'Book not found! Please try with a different Book ID',
    });
  }
});

// add a new book
app.post('/books/add', (req, res) => {
  const newBook = {
    id: Math.floor(Math.random() * 1000).toString(),
    title: `Book ${Math.floor(Math.random() * 1000)}`,
  };

  books.push(newBook);
  res.status(200).json({
    message: 'New Book added Successfully',
    data: newBook,
  });
});

// update a book
app.put('/books/update/:bookId', (req, res) => {
  const { bookId } = req.params;
  const findCurrentBook = books.find((book) => book.id === bookId);

  if (findCurrentBook) {
    findCurrentBook.title = req.body.title || findCurrentBook.title;
    res.status(200).json({
      message: `Book with ID ${req.params.id} updated successfully`,
      data: findCurrentBook,
    });
  } else {
    res.status(404).json({
      message: 'Book not found',
    });
  }
});

// delete a book
app.delete('/books/delete/:bookId', (req, res) => {
  const { bookId } = req.params;

  const findCurrentBookIndex = books.findIndex((book) => book.id === bookId);

  if (findCurrentBookIndex !== -1) {
    const deletedBook = books.splice(findCurrentBookIndex, 1)[0];
    res.status(200).json({
      message: 'Book deleted successfully',
      data: deletedBook,
    });
  } else {
    res.status(404).json({
      message: 'Book not found',
    });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
