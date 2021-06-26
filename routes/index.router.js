const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const passport = require("passport");

const { verifyAdmin, verifyAuthor } = require("../lib/middleware/verifyRole");

router.use("/account", upload.none(), require("./account/account.router"));

router.use("/admin", upload.none(), passport.authenticate('jwt', { session: false }), verifyAdmin, 
          require("./adminRole/admin.router"));

router.use("/author", upload.none(), passport.authenticate('jwt', { session: false }), verifyAuthor, 
          require("./authorRole/author.router"));

module.exports = router;