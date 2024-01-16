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
    return true;

  } else if (userEmail.length){
    console.log("Cannot use email");
    return true;
  }else if (userPhone.length){
    console.log("Cannot use Phone");
    return true;
  }
  
  //User not found

  return false;
}

//Creat user in database
userController.createUser = async (req, res, next)=>{
//check if user exists in the database
  console.log(req.body);
  const {email, phone} = req.body;
  const user = await verifyUser(email, phone);

  //if not then user the req.body to add user with Name, email, and Phone


  if(!user) {
    //create the user in database and return the id, name, and email
    res.locals.user = {user_id: "123", user_name:"Rob", user_email: "robjsand@mail.com"};
    next();
  }else{
    //user is found and return error notifying client that cannot use that email address or phone number
    res.status(401).send("User Exists try again");
  }
 
};

//check if user exists in the database
userController.verifyUserEmail = (req, res, next)=>{


  //if false send back message and redirect to sign up page

  //if true - verify the credentials sent and then send back a refreshed token.
    
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