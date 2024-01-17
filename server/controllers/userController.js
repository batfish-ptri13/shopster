const db = require('../models/shopsterModels.js');


//create userController object.
const userController = {};

async function verifyUser(email, phone) {
  const emailQuery = {
    text: `SELECT * FROM users WHERE user_email = $1`,
    values: [email],
  };
  const phoneQuery = {
    text: `SELECT * FROM users WHERE user_name = $1;`,
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
  //hash 
  //name, email, phone from req.body
  const {user_name, user_email, user_phone} = req.body;
  const hash = res.locals.hash;
 
  
  //create the user in database and return the id, name, and email
  const query = `INSERT INTO users (
      user_name,
      user_email,
      user_phone,
      user_hash
    ) VALUES (
      ${user_name},
      ${user_email},
      ${user_phone},
      ${hash}
    );`;
  await db.query(query);

  const userQuery = `SELECT user_id FROM users WHERE user_name= ${user_name}`;

  const userId = await db.query(userQuery);

  res.locals.user_id = userId;
  return next();
  
 
};


//check if user exists in the database
userController.verifyUser = async (req, res, next)=>{
  const {user_email, user_phone} = req.body;

  const user = await verifyUser(user_email, user_phone);

  //if false send back message and redirect to sign up page
  if(user.userExists === true){
    return res.status(401).json(user.reason);
  
  //if true - verify the credentials sent and then send back a refreshed token.
  }else{
    console.log('user verified verifyUser middleware, ready for createUserPassword');
    return next();
  }
    
};

userController.verifyUserPhone = (req, res, next)=>{


  //if false send back message and redirect to sign up page
  
  //if true - verify the credentials sent and then send back a refreshed token.
      
};

userController.verifyUserUandP = (req, res, next)=>{


  //if false send back message and redirect to sign up page
  
  //if true - verify the credentials sent and then send back a refreshed token.
      
};



module.exports = userController;