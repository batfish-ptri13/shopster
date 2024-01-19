const express = require('express');

const router =  express.Router();

//create route for Authorization

const {createUser, verifyUser, getUser} = require('../controllers/userController.js');
const {createToken, verifyToken} = require('../controllers/jwtController.js');
const {setCookie} = require('../controllers/cookieController.js');
const {createUserPassword,verifyUserPassword} = require('../controllers/passwordController.js');
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

router.use('/sendMagicLink', (req, res)=>{
  res.status(200).send("Response from Magic Link");

});

router.use('/verifytoken', verifyToken, (req, res )=>{
  return res.status(200).json(res.locals.loggedIn);
});

module.exports = router;