const { account } = require('../../../model/index.model');
const verify = require('../../../lib/accountFn/forgot_password/verify_jwt');
const { hashPassword } = require('../../../lib/accountFn/signup');

const resetPasswordController = async(req, res) => {
  try {

    const token_data = await verify(req.body.token);
    if (!token_data) {
      return res.status(401).json({ message: "token expired." });
    }

    const hash_data = await hashPassword(req.body.password);
    const data = await account.findOneAndUpdate({ _id: token_data.sub}, { password: hash_data });
    if (!data) {
      res.status(500).json({ message: "can not update password." });
    }

    res.status(200).json({
      message: "Reset password is success.",
      data: req.user
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error at controller."
    });
  }
};
module.exports = resetPasswordController;