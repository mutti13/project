// const { $_modify } = require("@hapi/joi/lib/base");
const {validate} = require("../models/hospitals");

function validateHost (req, res, next){

    let {error} = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    next();
   

}
module.exports =  validateHost;