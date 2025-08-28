import express from 'express';

const app = express();

// application level setting
app.set('view engine', 'ejs');

//routing
app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1>');
});

app.post('/api/data', (req, res) => {
  res.json({
    message: 'Data Received',
    data: re.body,
  });
});

// middleware function
app.use((err, req, res, next) => {
  res.status(500).send('Something went wrong 🥵🔺🀄');
});

const port = 5170;
app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});
