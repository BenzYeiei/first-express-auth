const jwtForgotpass = require("../../../lib/accountFn/forgot_password/create_jwtForgotpass");
const { account } = require("../../../model/index.model");
const nodemailerForgotpass = require("../../../lib/accountFn/forgot_password/nodemailerForgotpass");

const sendEmail_forgotPassword = async(req, res) => {
  try {
    // **** check emial
    const getData = await account.findOne({ email: req.body.email });
    if (!getData) {
      return res.status(404).json({ message: "email is not found." });
    }

    // **** create jwt
    const JwtData = await jwtForgotpass(getData._id);

    const payload = {
      name: getData.username,
      jwt: JwtData,
      link: "http://localhost:3000/accounts/forgot-password"
    };
    
    await nodemailerForgotpass(getData.email, payload);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message:"error at controller",
      errors: error
    });
  }
};
module.exports = sendEmail_forgotPassword;