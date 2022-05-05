const mongoose = require('mongoose');
const isAdmin = require('../middleware/isAdmin');
// const Brewer = require();


const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/AJDrinks';

const Admin = require("../models/Admin.model")
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


  const mainuser = 
    {
    username: "helo@helo.com", 
    password: "helohelo",
    admin: true
  }
;

Admin.create(mainuser)
  .then( adminDB => {
    console.log(`created ${adminDB} admin`); 
    mongoose.connection.close();

  })
  .catch(err => console.log(`An error occurred while creating admin from the DB: ${err}`));
