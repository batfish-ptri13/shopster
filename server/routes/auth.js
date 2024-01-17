const express = require('express');

const router =  express.Router();

//create route for Authorization

const {createUser, verifyUser} = require('../controllers/userController.js');
const {createToken} = require('../controllers/jwtController.js');
const {setCookie} = require('../controllers/cookieController.js');
const {createUserPassword} = require('../controllers/signupController.js');
//create user route

// router.use('/signup/:id', createUserPassword,createToken,setCookie,(req, res, next)=>{
   

//   // const result = {user:res.locals.user};
//   return res.status(200).send(res.locals.user);
    
// });


//create a user flow:  check if user exists
router.use('/signup', verifyUser, createUserPassword, createUser, createToken, setCookie, (req, res, next)=>{
  
  const result = {user:res.locals.user};
  return res.status(200).send(result);
  
});

router.use('/login', (req,res,next)=>{
  
 

  res.status(200).send("Success");

});

router.use('/sendMagicLink', (req, res, next)=>{
  res.status(200).send("Response from Magic Link");

});

module.exports = router;