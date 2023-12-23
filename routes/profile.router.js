const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');
const service = new OrderService();

const router = express.Router();

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    try {


      res.send('my-orders');
    } catch (error) {
      next(error)
    }
  }
);
