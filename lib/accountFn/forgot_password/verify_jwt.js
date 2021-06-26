const jwt = require('jsonwebtoken');

module.exports = async(token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRETKEY_FORGOT, function(err, decoded) {
      if (decoded === undefined) {
        return resolve(false);
      }
      resolve(decoded);
    });
  })
};