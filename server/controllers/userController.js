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

  //if not then user the req.body to add user with Name, email, and Phone
  
  //create the user in database and return the id, name, and email
    
  res.locals.user = {user_id: "123", user_name:"Rob", user_email: "robjsand@mail.com"};
  return next();
  
  //user is found and return error notifying client that cannot use that email address or phone number
   
  // return res.status(401).send({reason:user.reason});
  
 
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