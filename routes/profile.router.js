const express = require("express");
const passport = require("passport");

const OrderService = require("../services/order.service");

const service = new OrderService();

const router = express.Router();

router.get(
  "/my-orders",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;

      if (!user.customerId) {
        res.json([]);
        return;
      }
      const orders = await service.findByUser(user.customerId);

      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
