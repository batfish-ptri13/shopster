require('dotenv').config();

const nodemailer = require('nodemailer');

const {SMTP_PASS, SMTP_USERNAME} = process.env;

const transporter = nodemailer.createTransport({
  pool: false,
  host: "smtp.fastmail.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASS
  },
});


function sendMail(email, token){
  console.log("Sending Email");
  transporter.sendMail({
    from: 'auth_shopster@fastmail.com',
    to: `${email}`,
    subject: 'Shopster Login Link',
    text: 'Click the Link to Login',
    html:`<div style="diplay:flex; flex-direction:column; margin-top: 20px;margin-bottom:20px; ">
    <div style="margin-bottom:20px; margin-top:20px;">Thank you for shopping at Shopster... Please beware of tigers!</div>
    <a style="color:white;text-decoration: none;border:none;border-radius:4px; background-color:#312f32;width:100px;padding-left:5px;padding-right:5px; padding-top:10px;padding-bottom:10px;" 
    href="http://localhost:8080/auth/verifytoken/${token}">Click here to login</a></div>`
  }, (err, info) => {
    if(err) console.log(err);
    console.log("completed \n", info);
  });
    

}


module.exports = sendMail;


