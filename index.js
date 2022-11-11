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
