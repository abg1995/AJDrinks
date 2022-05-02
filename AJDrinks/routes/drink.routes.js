const router = require("express").Router();
//const mongoose = require("mongoose");
const Drink = require("../models/Drink.model")
//const Brewer = require();

//const {isLoggedIn} = require("../middleware/route-guard");

//READ ROUTES
router.get("/drinks", (req,res,next) => {
      Drink.find()
        .then((arr) => {
            res.render("drinks/drink-category",arr)
            console.log("sending signal")
        })
        .catch(err => console.log('error on drink read route', err))
})


//CREATE ROUTES

router.get("/drinks/create", (req,res,next) => {

})

module.exports = router;

