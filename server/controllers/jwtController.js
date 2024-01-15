const jwt = require('jsonwebtoken');
require('dotenv').config();

const {JWT_SECRET} = process.env;


const jwtController = {};



jwtController.createToken = (req, res, next)=>{
  //get user id and email
  //add to object and plact in first parameter
  var token = jwt.sign({ foo: 'bar' }, JWT_SECRET);

  //return token to next middleware function
  // res.locals.jwt = token;
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