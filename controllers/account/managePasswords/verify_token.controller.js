const { account } = require('../../../model/index.model');
const verify = require('../../../lib/accountFn/forgot_password/verify_jwt');

module.exports = async(req, res) => {
  try {
    const data = await verify(req.body.token);
    if (!data) {
      return res.status(404).json({
        message:"not found."
      });
    }

    const accountData = await account.findOne({ _id:data.sub }).select({ _id: 0, username: 1 });
    
    res.status(200).json({
      data: accountData
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error at controller.",
      errors: error
    });
  }
};