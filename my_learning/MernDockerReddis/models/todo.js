import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: "String",
    require: true,
  },
  description: {
    type: "String",
    require: true,
  },
});
export const Todo = mongoose.model("Todo", todoSchema);

// go to app.js and create a controller folder to
