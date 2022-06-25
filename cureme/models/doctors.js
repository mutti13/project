const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const doctorSchema = mongoose.Schema({

  name: String,
  contact: String,
  department: String,


});
const Doctor = mongoose.model("Doctor", doctorSchema);

function validateDoctor(data){ 
   const Schema = Joi.object({
     name: Joi.string().min(3).max(10).required(),
     contact: Joi.string().min(0).required(),
     department: Joi.string().min(0).required(),
   });
   return Schema.validate(data, {abortEarly: false});
}
module.exports.Doctor = Doctor;
module.exports.validate = validateDoctor;