const express = require('express');

const router =  express.Router();

//create route for Authorization
const signup = require('../controllers/signupController.js');
const {createUser} = require('../controllers/userController.js');
const {createToken} = require('../controllers/jwtController.js');

//create user route


//create a user
router.use('/signup', createUser, createToken,(req, res, next)=>{
  const result = {token: res.locals.token, user:res.locals.user};
  res.status(200).send(result);
});

router.use('/login', (req,res,next)=>{
  
 

  res.status(200).send("Success");

});

router.use('/sendMagicLink', (req, res, next)=>{
  res.status(200).send("Response from Magic Link");

});

module.exports = router;