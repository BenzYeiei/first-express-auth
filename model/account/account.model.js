const mongoose = require("mongoose");
const { hashPassword } = require("../../lib/accountFn/signup");

const account = mongoose.model("account", new mongoose.Schema({
  email: {
    type: String, 
    required: [true, "email is required."],
    unique: [true, "email is duplicated."],
    trim: [true, "email not space character."]
  },
  
  username: {
    type: String, 
    required: [true, "username is required."],
    unique: [true, "username is duplicated."],
    trim: [true, "username not space character."],
    minLength: [4, "username want caracter 4-20."],
    maxLength: [20, "username want caracter 4-20."],
  },
  
  password: { 
    type: String,
    required: [true, "password is required."],
  },

  admin: { 
    type: Boolean,
    default: false
  },

  author: { 
    type: Boolean,
    default: false
  },

  user: {
    type: Boolean,
    default: true
  }
}), "account");

const accountInstant = () => {
  account.estimatedDocumentCount()
  .then(async(value) => {
    if (value === 0) {
      try {
        const hashPass = await hashPassword(process.env.PASSWORD_ADMIN);

        const admin = await account.create({
          email:"non_email@mail.com",
          username: process.env.USERNAME_ADMIN,
          password: hashPass,
          admin: true,
          author: true,
          user: true
        });

        console.log(admin);
      } catch (error) {
        console.log(error);
      }
    };
  })
  .catch((err) => {
    if (err) { console.log(err); };
  });
};

module.exports = {
  account,
  accountInstant
};