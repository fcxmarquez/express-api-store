const express = require("express");
const passport = require("passport");
const CustomerService = require("../services/customers.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} = require("../schemas/customer.schema");

const router = express.Router();
const service = new CustomerService();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const customers = await service.find();
      res.json(customers);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validatorHandler(getCustomerSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createCustomerSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getCustomerSchema, "params"),
  validatorHandler(updateCustomerSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const customer = await service.update(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getCustomerSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.delete(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
