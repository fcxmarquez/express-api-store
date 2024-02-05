const express = require('express');
const passport = require('passport');
const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getOrderSchema, addItemSchema } = require('../schemas/order.schema');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new OrderService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  async (req, res, next) => {
    try {
      const orders = await service.find();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const newOrder = await service.create({ customerId: user.sub });
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.delete(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
