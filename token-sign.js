const jwt = require('jsonwebtoken');

const secret = 'myCat';
const payload = {
  sub: '1234567890',
  name: 'John Doe',
  admin: true,
};

const signToken = (payload, secret) => {
  return jwt.sign(payload, secret);
};

const token = signToken(payload, secret);
console.log(token)
