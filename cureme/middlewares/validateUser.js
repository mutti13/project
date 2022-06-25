const {validate} = require("../models/userModel");

function validateUser (req, res, next){

    let {error} = validate(req.body); //coming as an objectt
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    next();
   

}
module.exports =  validateUser;