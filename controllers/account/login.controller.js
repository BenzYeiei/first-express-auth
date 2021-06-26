const bcrypt = require('bcryptjs');

const { account } = require("../../model/index.model");
const signJwt = require("../../lib/accountFn/signJwt");


// $or: [ { email: { $lt: req.body.email } }, { username: req.body.username } ]
// $or:[ { 'email': req.body.email }, { 'username': req.body.username }]
// **** signin
const loginController = async(req, res) => {
  try {
    // **** check account
    const findUser = await account.findOne().or([
      { email: req.body.emailORusername }, 
      { username: req.body.emailORusername }
    ]);
    if (!findUser) {
      return res.status(404).json({ message: "username or email not correct." });
    };
    
    // **** check null and undefined of password 
    // **** because arguments of bcrypt.compare() must object or string
    if (req.body.password === null || req.body.password === undefined) {
      return res.status(403).json({
        message: "password not correct.",
      });
    }

    // **** check password
    const hashPass = await bcrypt.compare(req.body.password, findUser.password);
    if (!hashPass) {
      return res.status(403).json({
        message: "password not correct.",
      });
    };

    // **** create token
    const jwtValue = await signJwt(findUser._id);

    // **** response
    res.status(200).json({
      email: findUser.email,
      username: findUser.username,
      admin: findUser.admin,
      author: findUser.author,
      user: findUser.user,
      token: jwtValue.token,
      expire: jwtValue.expire,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error at controller.",
      errors: error
    });
  };
};
module.exports = loginController;