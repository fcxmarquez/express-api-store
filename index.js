const express = require('express');
const app = express();
const faker = require('faker');

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/new', (req, res) => {
  res.json({
    name: 'John Doe',
    age: 30,
  });
});

// GET

app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }

  res.json(products);
});

// All the specific routes has be before that the dynamic routes
app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filter');
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    name: 'Apple',
    price: 1.99,
  });
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;

  res.json({
    categoryId,
    productId,
  });
});

// Query params
app.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset)
    return res.json({
      limit,
      offset,
    });

  res.send('No limit or offset');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
