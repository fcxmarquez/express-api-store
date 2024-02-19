const { Strategy, ExtractJwt } = require("passport-jwt");
const { config } = require("../../../config/config");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // This is a function that will extract the token from the header
  secretOrKey: config.jwtSecret,
};

const JwtStrategy = new Strategy(options, (payload, done) => done(null, payload));

module.exports = JwtStrategy;
