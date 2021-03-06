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
        })
        .catch(err => console.log('error on drink read route', err))
})

router.get("/drinks/feedback", (req,res,next) => {
  res.render("drinks/drink-feedback")
})

//ABOUT US ROUTE 

router.get("/about-us", (req,res,next) => {
    Drink.find()
      .then(( ) => {
        res.render("about-us")
      })
      .catch(err => console.log('error on about us read route', err))
})


//CONTACT US ROUTE

router.get("/contact", (req,res) => {
    Drink.find()
      .then( () => {
        res.render("contact-us")
      })
      .catch(err => console.log('error on contact us read route', err))

})


//PROFILE PAGE ROUTE

router.get("/auth/user", isLoggedIn, (req,res) => {
  Drink.find()
    .then( () => {
      res.render("auth/user-profile")
    })
    .catch(err => console.log('error on contact us read route', err))

})

//CREATE ROUTES

//GET ROUTE 

router.get("/drinks/create", isLoggedIn, (req,res,next) => {

  Drink.find()
    
    .then((drinkArr) => {
      res.render("drinks/drink-create", {drinks: drinkArr});
    })
    .catch((err) => {console.log("error on get create form route", err)
      next(err)})
  
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
      if (drinkArr.length == 0){
        //hbs file
        res.render("drinks/no-drinks")
      }
      res.render("drinks/drinks", {drinks: drinkArr, category: drinkArr[0].category})
    })
    .catch(err => {
      console.log("error on dynamic route drinks", err);
     // next(err);
    })
})



router.get("/drinks/:drink/drink-details", isLoggedIn, (req,res,next) => {

  const id = req.params.drink;

  Drink.findById(id)
  .then( (drinkArr) => {
   //res.send("hello test")
    res.render("drinks/drink-details" ,{drinks: drinkArr})
  })
  .catch( (err) => {console.log("error on drink details get route", err)})
})

//EDIT ROUTE 

router.get("/drinks/:drink/edit", isLoggedIn, (req,res,next) => {

  const id = req.params.drink;

    Drink.findById(id)
      .then( (drinkArr) => {
        res.render("drinks/drink-edit", {drinks: drinkArr})
      })
      .catch((err) => {
        console.log("Error on get route for edit drinks", err);
      })

})

router.post("/drinks/:drink/edit", isLoggedIn, (req,res,next) => {

  const id = req.params.drink;


  const newInfo = {
    name: req.body.name,
    description: req.body.description,
    rating: req.body.rating,
    brewer: req.body.brewer,
    category: req.body.category
  }

  Drink.findByIdAndUpdate(id, newInfo)
    .then( (drinkFromDB) => {
        res.redirect(`/drinks`);
    })
    .catch( (err) => { console.log("error on POST rout of edit", err)})

})


// DELETE ROUTE
//isAdmin
router.post("/drinks/:drink/delete", (req, res, next) => {

  const id = req.params.drink;
  
  Drink.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/drinks/feedback");
    })
    .catch((err) => console.log("error deleting from DB: ", err));
});



module.exports = router;

