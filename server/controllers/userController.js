



const userController = {};

userController.createUser = (req, res, next)=>{
//check if user exists in the database

  //if not then user the req.body to add user with Name, email, and Phone

  //create a token for the user with JWT and send back to the user

  //redirect the user to the home page


};


userController.verifyUser = (req, res, next)=>{
//check if user exists in the database

  //if false send back message and redirect to sign up page

  //if true - verify the credentials sent and then send back a refreshed token.
    
};

