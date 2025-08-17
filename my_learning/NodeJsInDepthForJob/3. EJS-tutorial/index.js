import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const app = express();

// set the view engine as ejs
app.set('view engine', 'ejs');

// set the views directory
app.set('views', path.join(__dirname, 'views'));
// console.log(path.join(__dirname, 'views'));

const products = [
  {
    id: 1,
    title: 'Product 1',
  },
  {
    id: 2,
    title: 'Product 2',
  },
  {
    id: 3,
    title: 'Product 3',
  },
];

app.get('/', (req, res) => {
  res.render('home', { title: 'Home', products: products });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Page' });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running at port http://localhost:${PORT}`);
});
