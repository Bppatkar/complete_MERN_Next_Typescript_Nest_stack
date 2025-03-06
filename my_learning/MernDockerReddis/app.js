import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import userRoute from "./routes/user.js";
import todoRoute from "./routes/todo.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
connectDB(); // go to db folder to create database.js file
// then go to modal folder to create schema [creating controller folder] after that creating api so make route folder and then export that route and we use here using [middleware means 'use' keyword]

const PORT = process.env._PORT || 3000;

app.use("/api/v1/user", userRoute); // when we use this we get error because we are sending data from client to server so we have to use  middleware express.json and for express.json u need to add one more line [app.use(express.urlencoded({ extended: true }));]
//*you do not need body-parser because Express has inbuilt support for JSON and URL-encoded data.
//? one more api for login
//*  another api creation for todo [schema created in models then in controller logic is written then create api in routes and here we use that todo api]
app.use("/api/v1/todo", todoRoute);

app.listen(PORT, () => {
  console.log(`Server is Connected port at ${PORT}`);
});
