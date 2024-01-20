const express = require('express');

const router =  express.Router();

//create route for Authorization

const {createUser, verifyUser, getUser, verifyPhone,verifyUserFromText} = require('../controllers/userController.js');
const {createToken, verifyToken} = require('../controllers/jwtController.js');
const {setCookie, checkCookie} = require('../controllers/cookieController.js');
const {createUserPassword,verifyUserPassword, phoneCodeHash, textCodeVerify} = require('../controllers/passwordController.js');
const { sendTokenEmail } = require('../controllers/jwtController.js');
const { verifyTokenParams } = require('../controllers/jwtController.js');
const {sendCodeApi} = require('../controllers/textController.js');

//create user route

// router.use('/signup/:id', createUserPassword,createToken,setCookie,(req, res, next)=>{
   

//   // const result = {user:res.locals.user};
//   return res.status(200).send(res.locals.user);
    
// });


//create a user flow:  check if user exists
router.use('/signup', verifyUser, createUserPassword, createUser, createToken, setCookie, (req, res)=>{
  const {user_id} = res.locals.user;
  const result = {user_id};
  return res.status(200).send(result);
  
});

router.use('/login/uandp',getUser, verifyUserPassword, createToken, setCookie, (req, res)=>{

  const {user_id} = res.locals.user;
  const result = {user_id};
  return res.status(200).send(result);

});

router.use('/magicLink', getUser,createToken, sendTokenEmail, (req, res)=>{
  res.status(200).json("Response from Magic Link");

});

router.use('/verifytoken/:token', verifyTokenParams, (req, res )=>{
  const {user_id} = res.locals.user;
  return res.status(200).json({user_id});
});

router.use('/verifytoken', verifyToken, (req, res )=>{
  return res.status(200).json(res.locals.loggedIn);
});


// verify user with phone instead of email
// generate code to send to user, hash code and store in database
// send generated code to api as text message
// code navigates user to enter code page on frontend
// if code is correct to user hashed code, navigate to home page
router.use('/phonelink', verifyPhone, phoneCodeHash, sendCodeApi, (req, res) => {
  const {user_id} = res.locals.user;
  return res.status(200).json({user_id});
});

router.use('/verifytext', verifyUserFromText, textCodeVerify, createToken, setCookie, (req, res) => {

  return res.status(200).json(res.locals.user_id);
});

router.use('/checkCookie', verifyToken, (req, res) => {
  return res.status(200). json(res.locals.user_id);
});


module.exports = router;