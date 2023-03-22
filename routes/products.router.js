const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('../schemas/product.schema');
const router = express.Router();
const { models } = require('../libs/sequelize');

const productService = new ProductsService();

// GET

router.get(
  '/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const response = await productService.find(req);

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

// To use an error middleware, we have to use try catch
router.get(
  '/:productId',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await productService.findOne(productId);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// All the specific routes has be before that the dynamic routes
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

// POST
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await productService.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await productService.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await productService.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productService.delete(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
