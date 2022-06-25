const express = require("express");
const validateDoc = require("../../middlewares/validateDoctor");
let router = express.Router();
// var validateDoctor = require("../../middlewares/validateDoctor");
var { Doctor } = require("../../models/doctors");
const admin = require("../../middlewares/admin");

// var auth = require("../../middlewares/auth");
// var admin = require("../../middlewares/admin");


// get Doctor
router.get("/",async (req, res) => {
//   console.log(req.user);
//   let page = Number(req.query.page ? req.query.page : 1);
//   let perPage = Number(req.query.perPage ? req.query.perPage : 10);
//   let skipRecords = perPage * (page - 1);

  let doctors = await Doctor.find();
//   let total = await product.countDocuments();

  return res.send(doctors);
});

// get single product
router.get("/:id",admin, async (req, res) => {
  try {
    let doctors = await Doctor.findById(req.params.id);
    if (!doctors)
      return res.status(400).send("Doctor with given ID is not present!");
    return res.send(doctors);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

router.put("/:id", validateDoc,admin, async (req, res) => {
  let doctors = await Doctor.findById(req.params.id);
  doctors.name = req.body.name;
  doctors.contact = req.body.contact;
  doctors.department = req.body.department;
  await doctors.save();
  return res.send(doctors);
});



            //DELETE   
                       
router.delete("/:id" ,admin,async (req, res) => {
  let doctors = await Doctor.findByIdAndDelete(req.params.id);
  return res.send(doctors);
});


// insert a record
router.post( "/", validateDoc, admin, async (req, res) => {
  let doctors = new Doctor();
  doctors.name = req.body.name;
  doctors.contact = req.body.contact;
  doctors.department = req.body.department;
  await doctors.save();
  return res.send(doctors);
});
module.exports = router;