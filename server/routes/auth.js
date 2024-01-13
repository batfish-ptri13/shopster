const express = require('express');

const router =  express.Router();

//create route for Authorization
const signup = require('../controllers/signupController.js')

//create user route


//create 

router.use('/signup',(req, res, next)=>{
    res.status(200).send("Response from signup page")
})

router.use('/login', (req,res,next)=>{
    res.status(200).send("Response from login page")

})

router.use('/sendMagicLink', (req, res, next)=>{
    res.status(200).send("Response from Magic Link")

})

module.exports = router;