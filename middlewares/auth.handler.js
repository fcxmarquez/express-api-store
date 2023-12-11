const boom = require('@hapi/boom');
const { config } = require('../config/config');

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
};

const checkRoles = ([...roles]) => {
  return (req, res, next) => {
    const user = req.user;
    if (user.role === 'admin' || roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
};
// admin, customer, support, supplier

module.exports = { checkApiKey, checkRoles };

