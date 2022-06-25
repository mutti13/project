const express = require("express");
let router = express.Router();
var validatePatient = require("../../middlewares/validatePatient");
var {Patient } = require("../../models/patients");
// const admin = require("../../middlewares/admin");



// get Doctor
router.get("/",async (req, res) => {
    //   console.log(req.user);
    //   let page = Number(req.query.page ? req.query.page : 1);
    //   let perPage = Number(req.query.perPage ? req.query.perPage : 10);
    //   let skipRecords = perPage * (page - 1);
    
      let patients = await Patient.find();
    //   let total = await product.countDocuments();
    
      return res.send(patients);
    });
    
    // // get single product
    router.get("/:id", async (req, res) => {
      try {
        let patients = await Patient.findById(req.params.id);
        if (!patients)
          return res.status(400).send("Patient with given ID is not present!");
        return res.send(patients);
      } catch (err) {
        return res.status(400).send("Invalid ID");
      }
    });
    
    router.put("/:id", validatePatient, async (req, res) => {
      let patients = await Patient.findById(req.params.id);
      patients.name = req.body.name;
      patients.contact = req.body.contact;
      patients.age = req.body.age;
      await patients.save();
      return res.send(patients);
    });
    
    
    
//     //             //DELETE   
                           
    router.delete("/:id" ,async (req, res) => {
      let patients = await Patient.findByIdAndDelete(req.params.id);
      return res.send(patients);
    });
    
    
//                      // insert a record
    
    router.post( "/", validatePatient, async (req, res) => {
    
      let patients = new Patient();
      patients.name = req.body.name;
      patients.contact = req.body.contact;
      patients.age = req.body.age;
    
      await patients.save();
      return res.send(patients);
    });
    module.exports=router;;