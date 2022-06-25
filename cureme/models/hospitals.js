const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const hospitalSchema = mongoose.Schema({

  name: String,
  contact: String,
  address: String,
});


const Hospital = mongoose.model("Hospital", hospitalSchema);

function validateHospitals(data){ 
   const Schema = Joi.object({
     name: Joi.string().min(3).max(10).required(),
     contact: Joi.string().min(0).required(),
     address: Joi.string().min(0).required(),
   });
   return Schema.validate(data, {abortEarly: false});
}
module.exports.Hospital = Hospital;
module.exports.validate = validateHospitals;