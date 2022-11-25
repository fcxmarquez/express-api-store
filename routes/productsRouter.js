const express = require('express');
const ProductsService = require('../services/products.service');
const router = express.Router();

const productService = new ProductsService();

// GET

router.get('/', (req, res) => {
  const products = productService.find()
  res.json(products);
});

// All the specific routes has be before that the dynamic routes
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

// POST
router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({ message: 'created', data: body });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({ message: 'updated', data: body, id });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: 'deleted', id });
});

module.exports = router;
