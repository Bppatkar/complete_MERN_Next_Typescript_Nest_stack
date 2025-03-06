import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controller/todo.js";

const router = express.Router();

router.route("/").post(createTodo).get(getAllTodos);
// for updates we use id
router.route("/:todoId").put(updateTodo).delete(deleteTodo);

export default router;
// go to app.js
