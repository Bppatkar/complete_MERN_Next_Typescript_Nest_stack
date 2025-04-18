// change index.js in package.json file

import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const PORT = 3000;
const localhost = "127.0.0.1";

// we are accepting data from frontend side ok
// using middleware
app.use(express.json()); // receiving json data from frontend
app.use(express.urlencoded({ extended: true })); // receiving data from url which is in Coded form ok
// means any data we receive in json formate we accept that

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

//* we make simple application which stores my data in an array and perform a CRUD operation
let teaData = [];
let nextId = 1;

app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).json({
    success: true,
    message: "Tea added successfully",
    newTea,
  });
});

// list all the teas
app.get("/teas", (req, res) => {
  res.status(200).json({
    success: true,
    message: "All Teas are fetched successfully",
    tea: teaData,
  });
});

// get a single teas
app.get("/teas/:id", (req, res) => {
  // console.log("Requested ID:", req.params.id); // Debugging
  // console.log(
  //   "Stored IDs:",
  //   teaData.map((t) => t.id)
  // ); // Debugging

  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).json({
      success: false,
      message: "Tea is not found!!",
    });
  }
  res.status(200).send(tea);
});

// update a tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).json({
      success: false,
      message: "Tea name is not found!!",
    });
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.send(200).send(tea);
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("tea is not found");
  }
  teaData.splice(index, 1);
  return res.status(200).send("tea deleted successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://${localhost}:${PORT}`);
});
