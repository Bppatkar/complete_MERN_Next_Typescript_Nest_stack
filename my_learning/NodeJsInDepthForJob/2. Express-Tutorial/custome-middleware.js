import express from 'express';

const app = express();

// define middleware
const requestTimeStampLogger = (req, res, next) => {
  const timeStamp = new Date().toLocaleString();
  console.log(`${timeStamp} from ${req.method} to ${req.url}`);
  next();
};

app.use(requestTimeStampLogger);

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1>');
});

app.get('/about', (req, res) => {
  res.send('<h1>About Page</h1>');
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});
