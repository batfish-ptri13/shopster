const jwt = require('jsonwebtoken');
require('dotenv').config();
const sendMail = require('../auth/mailer.js');

const {JWT_SECRET} = process.env;


const jwtController = {};



jwtController.createToken = (req, res, next)=>{
  //get user id and email
  const {user_id} = res.locals.user;
  
  const token = jwt.sign({user_id}, JWT_SECRET);

  // res.locals.jwt = token;
  res.locals.token = token;


  //return token to next middleware function
  return next();
};


jwtController.verifyToken = (req, res, next)=>{
  //receives token from request Auth should be on authorization header
  //with the Format of Bearer jwt
  //Split authoriztion into array of [Bearer, jwt]
  const cookieArray = req.headers.cookie.split(";");
  let token;
  for (const el of cookieArray){
    if(el.includes('shopster_token')){
      const split = el.split("=");
      token = split[1];
      break;
    }
  }
  // const authArray = (req.headers.authorization).split(" ");
  //get jwt from array
  // const token = authArray[1];
  //runs through verify
  const result = jwt.verify( token, JWT_SECRET,(err, decoded)=>{
    
    return decoded;
  });
  // console.log(result);
  //if true sends true to middleware
  if(result) {
    res.locals.loggedIn = true;
    return next();
  }else{
  
    return res.staus(401).send("Redirect to login page");
    
  }

};


jwtController.verifyTokenBody = (req, res, next)=>{
  const {token} = req.body;
  const result = jwt.verify( token, JWT_SECRET,(err, decoded)=>{
    return decoded;
  });
  //add result to res.locals

//return to next middleware
};
jwtController.verifyTokenParams = (req, res, next)=>{

  const {token} = req.params;

  const result = jwt.verify( token, JWT_SECRET,(err, decoded)=>{
   
    return decoded;
  });
  //add result to res.locals
  console.log(result);
  //if true sends true to middleware
  if(result) {
    res.locals.loggedIn = true;
    return next();
  }else{
  
    return res.staus(401).send("Redirect to login page");
    
  }
  //return to next middleware
};

jwtController.sendTokenEmail = (req, res, next)=>{
  const {user_email} = req.body;
  sendMail(user_email,res.locals.token);
  return next();
};


module.exports = jwtController;

