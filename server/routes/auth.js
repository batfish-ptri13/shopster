const express = require('express');

const router =  express.Router();

//create route for Authorization


//create user route


//create 

router.use('/signup',(req, res, next)=>{
    res.status(200).send("Response from signup page")
})

router.use('/login', (req,res,next)=>{
    res.status(200).send("Response from login page")

})

module.exports = router;