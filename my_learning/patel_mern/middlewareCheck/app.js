import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

const app = express();

const PORT = process.env._PORT || 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200);
  res.send("<h1>This is homepage 🏡 welcome</h1>");
});

//! post method
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

app.listen(PORT, () => {
  console.log(`Server is Connected port at ${PORT}`);
});
