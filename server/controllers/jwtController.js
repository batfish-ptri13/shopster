const jwt = require('jsonwebtoken');
require('dotenv').config();

const {JWT_SECRET} = process.env;


const jwtController = {};



jwtController.createToken = (req, res, next)=>{
  //get user id and email
  const user_id = res.locals.user_id;
  
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
  const authArray = (req.headers.authorization).split(" ");
  //get jwt from array
  const token = authArray[1];
  //runs through verify
  const result = jwt.verify( token, JWT_SECRET,(err, decoded)=>{
    
    return decoded;
  });
  console.log(result);
  //if true sends true to middleware
  if(result) {
    // res.locals.loggedIn = true;
    return true;
  }else{
  //if false redirects to login page
    // res.staus(401).send("Redirect to login page");
    return false;
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
  const {token} = req.params.token;
  const result = jwt.verify( token, JWT_SECRET,(err, decoded)=>{
   
    return decoded;
  });
  //add result to res.locals
  
  //return to next middleware
};

module.exports = jwtController;

