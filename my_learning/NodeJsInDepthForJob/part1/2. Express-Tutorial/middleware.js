import express from 'express';

const app = express();

// define middleware
const firstMiddleware = (req, res, next) => {
  console.log('This first middleware will run on every request');
  next();
};

app.use(firstMiddleware);

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

//? Express Middleware
//*  Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

//* Middleware functions can perform the following tasks:

// Execute any code.
// Make changes to the request and the response objects.
// End the request-response cycle.
// Call the next middleware function in the stack.

//? If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
