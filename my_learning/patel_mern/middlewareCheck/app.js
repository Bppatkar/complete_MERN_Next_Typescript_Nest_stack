/* import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

const app = express();

const PORT = process.env._PORT || 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


//! post method
//! saving data
app.post("/api/v1/user/register", (req, res) => {
  // const { name, age, email } = req.body;
  const obj = req.body;
  // console.log(obj);  //* we see undefined because
  //* in node when we are accessing data from                 """"""client side to server side"""""" [any data] we get data in chuck , that is not readable because it is a buffer data means in ASCII codes
  //* in express js [node module] we have already middleware called body parser so we import it and use it so that data coming from client side convert into readable file and yes we can use middleware using 'use' keyword ok so we have to write this line
  //? app.use(bodyParser.urlencoded({ extended: true }));

  // console.log(obj); // checking again
  //* we get {} empty object because our data is not parsed into object so we use one more middleware app.use(express.json())

  console.log(obj); // checking again
  //! we got our data in console

  res.status(200).json({
    accountCreation: true,
    message: "New A/C Created Successfully",
    data: obj,
  });
});

// login api creation
app.post("/api/v1/user/login", (req, res) => {
  // const { email, password } = req.body;
  const obj = req.body;
  console.log(obj);
  //* we already using 2 middleware body parser and express.json

  res.status(200).json({
    login: true,
    timeStamp: Date.now(),
    message: "Login Successfully",
    data: obj,
  });
});

app.listen(PORT, () => {
  console.log(`Server is Connected port at ${PORT}`);
}); */

// ____________________________________________________________
//! above clean code***************************

/* import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.js";
dotenv.config();

const app = express();

const PORT = process.env._PORT || 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// routing middleware
app.use(userRoutes);



//! post method
//! saving data
//* importing routing from routes folder and we have to user it into middleware so we removed these both lines of below code
// app.post("/api/v1/user/register", userRoutes);
// app.post("/api/v1/user/login", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is Connected port at ${PORT}`);
  });
  */

// ____________________________________________________________
//! more clean code********************

import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.js";
dotenv.config();

const app = express();

const PORT = process.env._PORT || 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// routing middleware
app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is Connected port at ${PORT}`);
});
