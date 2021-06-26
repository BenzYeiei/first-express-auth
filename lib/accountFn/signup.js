const bcrypt = require('bcryptjs');

const hashPassword = (pass) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) { 
        return reject(err);
      }

      bcrypt.hash(pass, salt, function(err, hash) {
        if (err) { 
          return reject(err);
        }
        resolve(hash);
      });
    });
  });
};

module.exports = {
  hashPassword
};