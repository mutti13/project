// const { number } = require("@hapi/joi");
const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const bcrypt = require ("bcrypt");
const userSchema = mongoose.Schema({

  name: String,
  email: String,
  password: String,
  // contact: String,
  // age:Number,
  role: {
    type: String,
    default: "user",
  },

});

userSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
}

const User = mongoose.model("User", userSchema);

function validateUser(data){ 
   const Schema = Joi.object({

     name: Joi.string().min(3).max(20).required(),
     email: Joi.string().min(3).required(),
     password: Joi.string().min(3).required(),

    //  contact: Joi.string().min(0).required(),
    //  age: Joi.number().min(0).required(),
     role: Joi.string(),
   });}

  

//    return Schema.validate(data, {abortEarly: false});
// }


module.exports = User;
// module.exports.validateUser = validateUser;

