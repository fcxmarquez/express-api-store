const express = require("express");
const passport = require("passport");
const AuthService = require("../services/auth.service");

const router = express.Router();

const authService = new AuthService();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      res.json(authService.signToken(req.user));
    } catch (error) {
      next(error);
    }
  }
);

router.post("/recovery", async (req, res, next) => {
  try {
    const { email } = req.body;
    const response = await authService.sendRecoveryEmail(email);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
