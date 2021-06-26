const nodemailer = require("nodemailer");
const handlebar = require("handlebars");
const fs = require("fs");

module.exports = async(userEmail, payload) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.FORGOTUSERMAIL, 
        pass: process.env.FORGOTPASSMAIL, 
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const source = fs.readFileSync("./lib/templates/forgotmaill.handlebars", "utf8");
    const compiledTemplate = handlebar.compile(source);
    
    const options = {
      from: `BenzYeiei Demo Website 👻 ${process.env.FORGOTUSERMAIL}`,
      to: userEmail,
      subject: "Password Reset Request",
      text: 'Hello ',
      html: compiledTemplate(payload),
    };
  
    // **** transporter.sendMail() = time execute 2-3 second.
    //**** send mail with defined transport object
    // let info = await transporter.sendMail(options);
    await transporter.sendMail(options);
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    })
  };
};