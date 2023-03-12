const nodemailer = require("nodemailer");

module.exports = async function mail(params){
  try {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        auth: {
            user : "",
            pass: ""
        }
    });
    params.from = "";
    transporter.sendMail(params, (err, info) => {
      if (err) {
       return err;
      }
      if (info) {
        return info;
      }
    });
  } catch (err) {
    return err;
  }
};
