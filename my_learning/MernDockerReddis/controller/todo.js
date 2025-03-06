import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(403).json({
        success: false,
        message: "All field are required... please fill carefully",
      });
    }
    const todo = new Todo({ title, description });
    await todo.save();
    return res.status(201).json({
      success: true,
      message: "Todo Created Successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

// creating api for todo

//* now we are creating logic for getalltodos

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({
      success: true,
      // todos: todos.length === 0 ? [] : todos,
      //same thing done by simple line
      todos,
    });
  } catch (error) {
    console.log(error);
  }
};
// getalltodo api create - go to route

//* updating todos
export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId; // that params.todoId [todoId we receive from routes todo "/:todoId"]
    //? if we want to update title so get it first
    const { title } =  req.body;
    // const todo = await Todo.findById(todoId);
    const todo = await Todo.findByIdAndUpdate(todoId, {title}, { new: true });
    return res.status(200).json({
      success: true,
      message: "Todo Updated Successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

//* delete todo

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId; //that params.todoId [todoId we receive from routes todo "/:todoId"]
    const todo = await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({
      success: true,
      message: "Todo Deleted Successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};
