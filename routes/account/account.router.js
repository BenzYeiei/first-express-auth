const express = require("express");
const router = express.Router();
const passport = require("passport");

const registerController = require("../../controllers/account/register.controller");
const loginController = require("../../controllers/account/login.controller");

const sendEmail_forgotPass = require("../../controllers/account/managePasswords/sendEmail_forgotPass.controller");
const resetPasswordController = require("../../controllers/account/managePasswords/resetPassword.controller");

const account_list = require("../../controllers/account/account_list.controller");

const verifyToken = require("../../controllers/account/managePasswords/verify_token.controller");

const get = require('../../controllers/account/facebook/passport.controller');


// **** register for user
router.post("/register", registerController);

// **** login
router.post("/login", loginController);

// **** forgot password
router.post("/forgot-pass", sendEmail_forgotPass);

// **** Reset password
router.post("/rest-password", resetPasswordController);

// **** List username
router.get("/listusername", account_list);

// **** verify-token
router.post("/verify-token", verifyToken);

router.get("/o-auth", passport.authenticate("facebook"));

router.get("/o-auth/callback", passport.authenticate("facebook", {
  successRedirect: '/api/account/profile'
}));

router.get("/profile", get);

module.exports = router;