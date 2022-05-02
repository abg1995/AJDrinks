const { Schema, model } = require("mongoose");

const drinksSchema =new Schema( {
        name:{
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        description: String,
        rating: {
          type:  Number,
          min: 1,
          max: 10
        },
        brewer: {
            type:String,
        },
        image: String,

}
)

const Drinks = model("Drinks", drinksSchema)

module.exports = Drinks;
