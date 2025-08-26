import express from 'express';
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from '../controllers/todo';

const router = express.Router();
router.route('/').post(createTodo).get(getTodos);

router.route('/:todoId').patch(updateTodo).delete(deleteTodo);

export default router;
