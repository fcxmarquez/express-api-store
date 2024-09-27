const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  max: 10,
  windowMs: 1 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

module.exports = limiter;
