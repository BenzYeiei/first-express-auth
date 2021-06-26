const mongoose = require("mongoose");
const { accountInstant } = require("../model/index.model");

// **** Option mongoose
const mongooseOP = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
};

module.exports = () => {
  // **** connected
  mongoose.connect(process.env.MONGODB_ATLAS_CONFIG, mongooseOP, (err) => { 
    if (err) {
      console.log(err);
    }

    if (!err) {
      // **** create admin
      accountInstant();
      console.log("connected database.");
    }
  });
};