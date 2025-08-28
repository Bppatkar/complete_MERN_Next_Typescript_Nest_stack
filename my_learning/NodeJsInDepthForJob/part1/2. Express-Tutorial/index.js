import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

const port = 9000;
app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});
