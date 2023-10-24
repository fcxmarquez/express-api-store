const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTY5ODE3ODM1NH0.TWNKaI-FphT6ICVJmrc3II-wjqbNuTjTRWSep21o1P4'

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

const payload = verifyToken(token, secret);
console.log(payload)
