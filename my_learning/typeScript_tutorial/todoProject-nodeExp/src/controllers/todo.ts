import { Todo } from '../models/todo';
import { RequestHandler } from 'express';

const todos: Todo[] = [];

interface CreateTodoBody {
  text: string;
}

export const createTodo: RequestHandler = (req, res) => {
  const text = (req.body as CreateTodoBody).text;
  const newTodo = new Todo(Math.random().toString(), text);
  todos.push(newTodo);
  res.status(201).json({ message: 'Todo Created Successfully', newTodo });
};

export const getTodos: RequestHandler = (req, res) => {
  res.status(200).json({ todos });
};

export const updateTodo: RequestHandler<{ todoId: string }> = (req, res) => {
  const todoId = req.params.todoId;
  const text = (req.body as CreateTodoBody).text;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos[todoIndex] = new Todo(todos[todoIndex].id, text);
  res.status(200).json({ message: 'Todo updated', newTodo: todos[todoIndex] });
};

export const deleteTodo: RequestHandler<{ todoId: string }> = (req, res) => {
  const todoId = req.params.todoId;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const deletedTodo = todos.splice(todoIndex, 1);
  res.status(200).json({ message: 'Todo Deleted', deletedTodo });
};
