const { account } = require('../../model/index.model');

module.exports = async(req, res) => {
  try {
    await account.findOneAndDelete({ username: req.body.username });
    res.status(200).json({
      success: true,
      username: req.body.username
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      errors: error
    })
  }
};