

require('dotenv').config();
const {TWILIO_SID, TWILIO_SECRET} = process.env;

const client = require('twilio')(TWILIO_SID, TWILIO_SECRET);


const textController = {};




textController.sendCodeApi = (req, res, next) => {
  
  const phone_code = res.locals.phone_code;
  const {user_phone} = res.locals.user;
  
  client.messages
    .create({
      body: `Your code is: ${phone_code}`,
      from: '+18887467499',
      to: `+1${user_phone}`
    })
    .then(message => { 
      return next();
    })
    .catch(err => {
      return next({
        log: 'Error in sendCodeApi, textController',
        message: {err: `Error in sendCodeApi, textController: ${err}`}
      });
    });

};




module.exports = textController;