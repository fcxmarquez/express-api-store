const { Strategy } = require("passport-local");
const AuthService = require("../../../services/auth.service");

const authService = new AuthService();

const LocalStrategy = new Strategy(
  {
    usernameField: "email", // With this we can use the email field as username, it's a way to change the default usernameField to another name like email
  },
  async (username, password, done) => {
    try {
      const user = await authService.getUser(username, password);

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
