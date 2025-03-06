import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200);
  res.send("<h1>This is homepage 🏡 welcome</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is Connected port at ${PORT}`);
});
