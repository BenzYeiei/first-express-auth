const { account } = require("../../model/index.model");
const { hashPassword } = require("../../lib/accountFn/signup");


// **** signup for user
const registerController = async(req, res) => {
  try {
    if (req.body.password==="" || req.body.password===null || req.body.password===undefined) {
      return res.status(500).json({
        message: "password is required.",
        errors: { errors: { password: { kind: "required" }}}
      });
    }
    const dataHash = await hashPassword(req.body.password);

    const data = await account.create({
      email: req.body.email,
      username: req.body.username,
      password: dataHash,
    });

    res.status(200).json({
      email: data.email,
      username: data.username,
      password: req.body.password,
      urlSignin: "https://benzyeiei-demo.herokuapp.com/api/account/signin"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error at controller.",
      errors: error
    });
  }
};


module.exports = registerController;