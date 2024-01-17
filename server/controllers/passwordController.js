
const bcrypt = require('bcryptjs');

const signupController = {};


signupController.createUserPassword = (req, res, next)=>{

  console.log('entered createUserPassword in passwordController.js');
  
  const {user_pass} = req.body;

  if(!user_pass){
    next({
      log:"Error in Signup",
      status: 400});}

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user_pass, salt, function(err, hash) {
      //store hash in user db and return the user token
      if(err){
        next({
          log:"Error in Signup",
          status: 400});
      }
      
      console.log('hash sucessful createUserPassword: ', hash);
      
      res.locals.hash = hash;
      return next();
      //step into next middleware to create token
    //     return next();
    //   })
    //   .catch((err) => {
    //     return next({err});
    //   });
    });
  });

};



module.exports = signupController;