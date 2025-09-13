import express from 'express';
import {
  addAuthorController,
  deleteAuthorController,
} from '../controllers/authorController.js';

const router = express.Router();

router.post('/add-author', addAuthorController);
router.delete('/:id', deleteAuthorController);

export default router;
