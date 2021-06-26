const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (id) => {
  return new Promise((resolve, reject) => {
    const expire = 60 * 60 * 24;
    jwt.sign({ sub: id }, process.env.SECRETKEY, { algorithm: 'HS256', expiresIn: expire }, function(err, token) {
      if (err) {
        return reject(err);
      }
      return resolve({token: "Bearer " + token, expire : expire});
    });
  });
};