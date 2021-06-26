const { account } = require('../../model/index.model');

module.exports = async(req, res) => {
  try {
    const accountData = await account.find()
    .where({ admin: false })
    .select({_id:0, username:1});
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