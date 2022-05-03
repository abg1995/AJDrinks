const router = require("express").Router();
//const mongoose = require("mongoose");
const Drink = require("../models/Drink.model")
//const Brewer = require();
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const isAdmin = require("../middleware/isAdmin");

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

//EDIT ROUTE




//DYNAMIC ROUTE PUSH THEM DOWN

router.get("/drinks/:drink",  isLoggedIn, (req,res,next) => {
  const drink = req.params.drink.toUpperCase();

  Drink.find({category: drink})
    .then( (drinkArr) => {
      res.render("drinks/drinks", {drinks: drinkArr, category: drinkArr[0].category})
    })
    .catch(err => {
      console.log("error on dynamic route drinks", err);
      next(err);
    })
})



router.get("/drinks/:drink/drink-details", isLoggedIn, (req,res,next) => {

  const id = req.params.drink;

  Drink.findById(id)
  .then( (drinkArr) => {
    res.send("hello test")
   // res.render("drinks/drink-details", {drinks: drinkArr, category: drinkArr[0].category})
  })
  .catch( err => console.log("error on drink details get route"), err)
  next(err);
})

// DELETE ROUTE

router.post("/drinks/:drink/delete", isAdmin, (req, res, next) => {

  const id = req.params.drink;

  Drink.findByIdAndRemove(id)
    .then(() => {
      alert("Drink Removed");
      res.redirect("/drinks");
    })
    .catch((err) => console.log("error deleting from DB: ", err));
});



module.exports = router;

