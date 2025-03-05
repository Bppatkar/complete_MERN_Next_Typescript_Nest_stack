import express from "express";

const app = express();
const PORT = 3000;
const localhost = "127.0.0.1";

// we are accepting data from frontend side ok
// using middleware
app.use(express.json());
// means any data we receive in json formate we accept that

//* we make simple application which stores my data in an array and perform a CRUD operation
const teaData = [];
const nextId = 1;

const saveTea = (tea) => {};

app.listen(PORT, () => {
  console.log(`Server is running at http://${localhost}:${PORT}`);
});
