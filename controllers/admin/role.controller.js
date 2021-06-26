const { account } = require("../../model/index.model");


// **** admin Home
const adminHome = (req, res) => {
  res.status(200).json({
    message: "Hello admin."
  });
};


// **** add role of author
const addAuthor = async() => {
  try {
    const userData = await account.findOneAndUpdate(
      { username: req.body.username },
      { author: true }
    );
    
    if (!userData) {
      return res.status(404).json({ message: "username is not found." })
    }

    res.status(200).json({ message: "such username added role." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error at controller.",
      errors: error
    });
  }
};


// **** add role of author
const removeAuthor = async(req, res) => {
  try {
    const userData = await account.findOneAndUpdate(
      { username: req.body.username },
      { author: false }
    );
    
    if (!userData) {
      return res.status(404).json({ message: "username is not found." })
    }

    res.status(200).json({ message: "such username added role." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error at controller.",
      errors: error
    });
  }
};

module.exports = {
  adminHome,
  addAuthor,
  removeAuthor
};