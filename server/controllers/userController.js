const db = require('../models/shopsterModels.js');


//create userController object.
const userController = {};

async function verifyUser(email, phone) {
  const emailQuery = {
    text: `SELECT * FROM users WHERE user_email = $1`,
    values: [JSON.stringify(email)],
  };
  const phoneQuery = {
    text: `SELECT * FROM users WHERE user_phone = $1;`,
    values: [phone],
  };
  let userEmail = await db.query(emailQuery);
  
  userEmail = userEmail.rows;
  let userPhone = await db.query(phoneQuery);
  userPhone = userPhone.rows;
  
  
  if(userEmail.length && userPhone.length){
    return {userExists:true, reason:"Cannot use email or phone number"};

  } else if (userEmail.length){
    
    return {userExists:true, reason:"Cannot use email"};
  }else if (userPhone.length){
   
    return {userExists:true, reason:"Cannot use phone number"};
  }
  
  //User not found

  return {userExists:false, reason:"User not found in DB"};
}

//Creat user in database
userController.createUser = async (req, res, next)=>{
//check if user exists in the database

  const {user_name, user_email, user_phone} = req.body;
  const hash = res.locals.hash;
  JSON.stringify(hash);

  const text = 'INSERT INTO users(user_name, user_email, user_phone, user_hash) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [user_name, JSON.stringify(user_email),user_phone, hash];
 
  const person = await db.query(text, values);

  res.locals.user = person.rows[0];
  return next();
  
 
};


//check if user exists in the database
userController.verifyUser = async (req, res, next)=>{
  const {user_email, user_phone} = req.body;

  const user = await verifyUser(user_email, user_phone);

  //if false send back message and redirect to sign up page
  console.log(user, "Line 85");
  if(user.userExists === true){
    return res.status(401).json(user.reason);
  
  //if true - verify the credentials sent and then send back a refreshed token.
  }else{
    console.log('user verified verifyUser middleware, ready for createUserPassword');
    return next();
  }
    
};

userController.verifyPhone = async (req, res, next) => {
  
  const {user_phone} = req.body;

  console.log('userController verifyPhone user_phone type: ', typeof user_phone);
  
  const phoneQuery = {
    text: `SELECT * FROM users WHERE user_phone = $1;`,
    values: [user_phone],
  };
  
  let userPhone = await db.query(phoneQuery);
 
  userPhone = userPhone.rows[0];
  
  if (!userPhone.user_phone.length){
    return res.status(401).json('Phone number is not connected to an account');
  } else {
    res.locals.user = userPhone;
    next();
  }

};





userController.getUser = async (req, res, next)=>{
  // email and pass from req.body
  const {user_email, user_pass} = req.body;

  //db query to check if the user exists, if so return user_id and user_hash, res.locals.hashPass
  const text = 'SELECT * FROM users WHERE user_email= $1';
  const values = [JSON.stringify(user_email)];

  const result = await db.query(text, values);
  console.log(result, "Line 108 User Controller \n");
  if(!result.rows.length) {
    return res.status(401).json('User not found, go to sign up page');
  }
  res.locals.user = result.rows[0];
  return next();
};

userController.verifyUserFromText = async (req, res, next) => {
  
  const {user_id} = req.body;

  
  const userQuery = {
    text: `SELECT * FROM users WHERE user_id = $1;`,
    values: [user_id],
  };
  
  const userId = await db.query(userQuery);
 
  const user = userId.rows[0];
  
  if (!user){
    return res.status(401).json('Phone number is not connected to an account');
  } else {
    res.locals.user = user;
    next();
  }

};

module.exports = userController;