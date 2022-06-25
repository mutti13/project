const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const patientSchema = mongoose.Schema({

  name: String,
  contact: String,
  age: String,


});
const Patient = mongoose.model("Patient", patientSchema);

function validatePatient(data){ 
   const Schema = Joi.object({
     name: Joi.string().min(3).max(10).required(),
     contact: Joi.string().min(0).required(),
     age: Joi.string().min(0).required(),
   });
   return Schema.validate(data, {abortEarly: false});
}
module.exports.Patient = Patient;
module.exports.validate = validatePatient;