const verifyAdmin = async(req, res, next) => {
  try {
    if (!req.user.admin) {
      return res.status(403).json({ message: "insufficient rights to a resource." });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

const verifyAuthor = async(req, res, next) => {
  try {
    if (!req.user.author) {
      return res.status(403).json({ message: "insufficient rights to a resource." });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  verifyAdmin,
  verifyAuthor
};