const mongoose = require('mongoose');
// const Brewer = require();
const Drink = require('../models/Drink.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/AJDrinks';

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


  const drinks = [
    {
        name: 'Roku Gin',
        description: 'a japanese gin created with 6 botanicals hence the name roku meaning 6 in japanese',
        rating: 8,
        brewer: 'Suntory',
        category: 'gin',
        image: ''
    },
    {
        name: 'El Patron Silver',
        description: 'Mexican tequila curated for 2 years in barrel giving you a nice transparent color',
        rating: 7,
        brewer: 'Patron',
        category: 'tequila',
        image: ''
    },
    {
        name: 'Talisker 10',
        description: 'Single malt scotch whiskey aged for 10 years in barrel',
        rating: 9,
        brewer: 'Talisker',
        category: 'whiskey',
        image: ''
    },
    {
        name: 'Paulaner',
        description: 'Pure german beer',
        rating: 8,
        brewer: 'unkwon',
        category: 'beer',
        image: ''
    },
    {
        name: 'Celeste reserva',
        description: 'Spanish wine from Ribiera del duero with a fruity accent',
        rating: 10,
        brewer: 'Torres',
        category: 'wine',
        image: ''
    },
    {
      name: 'Grey Goose Vodka',
      description: 'Drink this to forget what you do the day of tomorrow',
      rating: 8,
      brewer: '',
      category: 'vodka',
      image: ''
  }
  
  ];

Drink.create(drinks)
  .then( drinksDB => {
    console.log(`created ${drinksDB} drinks`); 
    mongoose.connection.close();

  })
  .catch(err => console.log(`An error occurred while creating drinks from the DB: ${err}`));
