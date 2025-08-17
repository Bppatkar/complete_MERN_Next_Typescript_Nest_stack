import express from 'express';
import {
  addNewBook,
  deleteBook,
  getAllBooks,
  getSingleBookById,
  updateBook,
} from '../controllers/book-controller.js';

const router = express.Router();

router.get('/get', getAllBooks);
router.get('/get/:id', getSingleBookById);
router.post('/add', addNewBook);
router.put('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook);

export default router;
