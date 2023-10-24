const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const UserService = require('../../../services/user.service');
const bcrypt = require('bcrypt');

const service = new UserService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'email', // With this we can use the email field as username, it's a way to change the default usernameField to another name like email
  },
  async (username, password, done) => {
    try {
      const user = await service.findByEmail(username);

      if (!user) done(boom.unauthorized(), false);

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) done(boom.unauthorized(), false);

      delete user.dataValues.password;

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
