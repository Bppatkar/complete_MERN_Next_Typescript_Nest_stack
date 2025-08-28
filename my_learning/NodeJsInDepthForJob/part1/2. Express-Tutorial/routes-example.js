import express from 'express';

const app = express();

// root route
app.get('/', (req, res) => {
  res.send('Welcome to Home Page 🏠');
});

// getting all products
app.get('/products', (req, res) => {
  const products = [
    { id: 1, lable: 'Product 1' },
    { id: 2, lable: 'Product 2' },
    { id: 3, lable: 'Product 3' },
  ];
  res.json({
    message: 'All Products Fetched Successfully',
    data: products,
  });
});

// getting single products [dynamic route]
app.get('/products/:productId', (req, res) => {
  console.log('req.params', Object.assign({}, req.params));

  const productId = parseInt(req.params.productId);
  const products = [
    { id: 1, lable: 'Product 1' },
    { id: 2, lable: 'Product 2' },
    { id: 3, lable: 'Product 3' },
  ];

  const getSingleProduct = products.find((product) => product.id === productId);
  if (getSingleProduct) res.json(getSingleProduct);
  else
    res
      .status(404)
      .json({ message: 'Product Not Found try again with valid id' });
});

const port = 9000;
app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});
