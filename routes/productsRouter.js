const express = require('express');
const ProductsService = require('../services/product.service');
const router = express.Router();

const productService = new ProductsService();

// GET

router.get('/', async (req, res) => {
  const products = await productService.find();
  res.json(products);
});

// To use an error middleware, we have to use try catch
router.get('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await productService.findOne(productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// All the specific routes has be before that the dynamic routes
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

// POST
router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await productService.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await productService.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productService.delete(id);
  res.json(product);
});

module.exports = router;
