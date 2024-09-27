const express = require("express");
const passport = require("passport");
const AuthService = require("../services/auth.service");
const {
  forgetPasswordSchema,
  recoverySchema,
  loginSchema,
} = require("../schemas/auth.schema");
const validatorHandler = require("../middlewares/validator.handler");
const limiter = require("../middlewares/rateLimit.handler");

const router = express.Router();

const authService = new AuthService();

router.post(
  "/login",
  validatorHandler(loginSchema, "body"),
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      res.json(authService.signToken(req.user));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/recovery",
  validatorHandler(recoverySchema, "body"),
  limiter,
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const response = await authService.sendRecoveryEmail(email);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/change-password",
  validatorHandler(forgetPasswordSchema, "body"),
  async (req, res, next) => {
    try {
      const { token, newPassword, oldPassword } = req.body;
      const response = await authService.changePassword(token, newPassword, oldPassword);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
