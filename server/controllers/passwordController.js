
const bcrypt = require('bcryptjs');
const db = require('../models/shopsterModels.js');

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

signupController.verifyUserPassword = (req, res, next)=>{
  const {user_hash} = res.locals.user;
  const {user_pass} = req.body;
  bcrypt.compare(user_pass, user_hash, function(err, response) {
  
    if(!response){
      return res.status(401).json('Wrong Pass');
    }
    return next();
  });
};

signupController.phoneCodeHash = async (req, res, next) => {
  const {user_id} = res.locals.user;
  
  // generate 6 digit code
  const phoneCode = Math.floor(100000 + Math.random() * 900000);
  
  bcrypt.hash(JSON.stringify(phoneCode), 10).then( async (hash)=> {
    // Store hash in your password DB.
    const text = 'UPDATE users SET user_phone_hash= $1 WHERE user_id= $2;';
    const values = [JSON.stringify(hash), user_id];
   
    await db.query(text, values);

    res.locals.phone_code = phoneCode;

  
    return next();
  });

  // bcrypt.hash(phoneCode, 10,  function(err, hash) {
  //   console.log(hash, "Hash");
  //   const text = 'UPDATE users SET user_phone_hash= $1 WHERE user_id= $2;';
  //   const values = [JSON.stringify(hash), user_id];
   
  //   db.query(text, values);

  //   res.locals.phone_code = phoneCode;

  
  //   return next();
  // });
};
signupController.textCodeVerify = (req, res, next)=>{
  const {text_code} = req.body;
  console.log(res.locals.user, "Line 74");

  const {user_phone_hash} = res.locals.user;
  
  // bcrypt.compare(text_code, user_phone_hash, function(err, response) {
  //   console.log(user_phone_hash , "User Phone Hash");
  //   if(!response){
  //     return res.status(401).json('Wrong Code');
  //   }
  //   console.log(response, "Line 98");
  //   return next();
  // });
  bcrypt.compare(text_code, JSON.parse(user_phone_hash)).then(function(response) {
    console.log(user_phone_hash , "User Phone Hash");
    if(!response){
      return res.status(401).json({result:"Wrong Code"});
    }
    console.log(response, "Line 98");
    return next();
  });
};
// hash code
// bcrypt.genSalt(10)
//   .then(async salt => {
//     console.log(salt, "Line 64");
//     const hash = await bcrypt.hash(phoneCode, salt);
//     console.log(hash, "Line 66");
//     return hash;
//   })
//   .then(hash => {
//     console.log(hash, "Line 62");
//     console.log('code hash sucessful in phoneCodeHash: ', hash);
//     return hash;
//   })
//   .then(async dbHash => {
//     console.log(dbHash, "Line 71");
//     // store hash in database
//     const text = 'UPDATE users SET user_phone_hash= $1 WHERE user_id= $2;';
//     const values = [JSON.stringify(dbHash), user_id];
     
//     await db.query(text, values);
  
//     res.locals.phone_code = phoneCode;
//     return next();
//   })
//   .catch(err => {
//     return next({
//       log: 'Error in phoneCodeHash, passwordController',
//       message: {err: `Error in verifyPhone, passwordController: ${err}`}
//     });
//   });

//  ), function(err, salt) {
//     bcrypt.hash(phoneCode, salt, function(err, hash) {
//       if (err) {
//         next({
//           log:"Error in signupController.phoneCodeHash",
//           status: 400});
//       }
//       console.log('code hash sucessful in phoneCodeHash: ', hash);
      
//       phoneHash = hash;
      
//       // store hash in database
//       const text = 'UPDATE users SET user_phone_hash= $1 WHERE user_id= $2;';
//       const values = [JSON.stringify(phoneHash), id];
     
//       await db.query(text, values);
  
//       res.locals.phone_code = phoneCode;
//       return next();
//     });
//   });
  



module.exports = signupController;