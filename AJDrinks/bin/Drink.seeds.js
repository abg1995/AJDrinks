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
        category: 'GIN',
        image: ''
    },
    {
        name: 'El Patron Silver',
        description: 'Mexican tequila curated for 2 years in barrel giving you a nice transparent color',
        rating: 7,
        brewer: 'Patron',
        category: 'TEQUILA',
        image: ''
    },
    {
        name: 'Hibiki Whiskey',
        description: 'Fine japanese whiskey',
        rating: 8,
        brewer: 'Suntory',
        category: 'WHISKEY',
        image: 'https://www.labarricavinos.com/wp-content/uploads/2016/06/HIBIKI.jpg'
    },
    {
        name: 'Sapporo Silver',
        description: 'Pure japanese beer from Sapporo region',
        rating: 8,
        brewer: 'Sapporo',
        category: 'BEER',
        image: 'https://cdn.shopify.com/s/files/1/0404/8086/6465/products/Sapporo-premium_grande.png?v=1594402980'
    },
    {
        name: 'Asahi Super Dry ',
        description: 'Tasty japanese beer lagger',
        rating: 9,
        brewer: 'Asahi Japan',
        category: 'BEER',
        image: 'https://www.japonshop.com/img/productos/prd-cerveza-asahi-super-dry-japonshop.jpg'
    },
    {
      name: 'Captain Morgan',
      description: 'Nice for cocktails',
      rating: 6.5,
      brewer: 'Captain Morgan',
      category: 'RUM',
      image: 'https://static.carrefour.es/hd_510x_/img_pim_food/777180_00_1.jpg'
  }
  
  ];

Drink.create(drinks)
  .then( drinksDB => {
    console.log(`created ${drinksDB} drinks`); 
    mongoose.connection.close();

  })
  .catch(err => console.log(`An error occurred while creating drinks from the DB: ${err}`));
