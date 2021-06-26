const jwt = require('jsonwebtoken');
module.exports = (_id) => {
  return new Promise((resolve, reject) => {
    const setSub = { sub: _id };
    const setOption = { algorithm: 'HS256', expiresIn: 60 * 15 };
    jwt.sign( setSub, process.env.SECRETKEY_FORGOT, setOption, function(err, token) {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  });
}