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

//GET ROUTE 

router.get("/drinks/create", isLoggedIn, (req,res,next) => {

  if(!req.session.user){
    res.redirect("/login")
  }else if (req.session.user){
  Drink.find()
    
    .then((drinkArr) => {
      res.render("drinks/drink-create", {drinks: drinkArr});
    })
    .catch((err) => {console.log("error on get create form route", err)
      next(err)})
  }
})

//POST CREATE ROUTE

router.post("/drinks/create", (req,res,next) => {
    const newDrink = {
      name: req.body.name,
      description: req.body.description,
      rating: req.body.rating,
      category:req.body.category,
      brewer:req.body.brewer,
      image: req.body.image
    };
    Drink.create(newDrink)
      .then( (drinkFromDB) => {
        res.redirect("/drinks")
      })
      .catch((err) => {
        console.log("error adding drink in post route", err);
        next(err);
      });

});



//router.get("/")




module.exports = router;

