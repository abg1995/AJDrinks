const router = require("express").Router();
//const mongoose = require("mongoose");
const Drink = require("../models/Drink.model")
//const Brewer = require();
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

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

//  isLoggedIn,

router.get("/drinks/create",  (req,res,next) => {
  Drink.find()
    .then((drinkArr) => {
      res.send("hello there")
     // res.render ("drinks/drinks-create", {drinks: drinkArr});
    })
    .catch(err => {console.log("error on get create form route", err)
      next(err)})
})

router.post("/drinks/create", (req,res,next) => {})

module.exports = router;

