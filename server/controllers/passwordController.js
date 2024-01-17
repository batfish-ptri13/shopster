
const bcrypt = require('bcryptjs');

const signupController = {};


signupController.createUserPassword = (req, res, next)=>{
  
  const {password} = req.body;

  if(!password){
    next({
      log:"Error in Signup",
      status: 400});}

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      //store hash in user db and return the user token
      console.log(hash);
      
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