
module.exports = async(req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.profile
    });
  } catch (error) {
    
  }
};