import express from 'express';
import bookController from '../controllers/bookController.js';

const router = express.Router();

router.post('/add-new-book', bookController.addBook);
router.get('/get-all-books', bookController.getAllBooks);
router.get('/:id'.bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
