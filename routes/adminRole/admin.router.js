const express = require("express");
const router = express.Router();

const {
  adminHome,
  addAuthor,
  removeAuthor
} = require("../../controllers/admin/role.controller");

const destroy_account = require("../../controllers/admin/destroy_account.controller");


// **** admin Home
router.get("/", adminHome);


// **** add role of author
router.post("/add-author", addAuthor);


// **** add role of author
router.post("/remove-author", removeAuthor);


// **** destroy account
router.post("/destroy-account", destroy_account);


module.exports = router;