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


function sendMail(email, code){
  transporter.sendMail({
    from: 'auth_shopster@fastmail.com',
    to: `${email}`,
    subject: 'Shopster Login Link',
    text: 'I hope this message gets delivered!',
    html:"<div><button>Click here to login</button></div>"
  }, (err, info) => {
    if(err) console.log(err);
    console.log("completed \n", info);
  });
    

}

sendMail("rob@laserleadmarketing.com");


module.exports = sendMail;
