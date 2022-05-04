const User = require('../models/User.model');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = require("express").Router();

// redirect to User-Profile after login

router.get("/user-profile", isLoggedIn ,(req, res ,next)=> {
    User.find(()=>{})
    res.render('auth/user-profile.hbs')
})


module.exports = router