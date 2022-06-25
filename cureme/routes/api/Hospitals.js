const express = require("express");
let router = express.Router();
var validateHost = require("../../middlewares/validateHospital");
var { Hospital } = require("../../models/hospitals");
const admin = require("../../middlewares/admin");


// var auth = require("../../middlewares/auth");
// var admin = require("../../middlewares/admin");


// get Hospital
router.get("/",async (req, res) => {
//   console.log(req.user);
//   let page = Number(req.query.page ? req.query.page : 1);
//   let perPage = Number(req.query.perPage ? req.query.perPage : 10);
//   let skipRecords = perPage * (page - 1);

  let hospitals = await Hospital.find();
//   let total = await product.countDocuments();

  return res.send(hospitals);
});

// // get single HOSPITAL
router.get("/:id",admin, async (req, res) => {
  try {
    let hospitals = await Hospital.findById(req.params.id);
    if (!hospitals)
      return res.status(400).send("Hospital with given ID is not present!");
    return res.send(hospitals);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

router.put("/:id", validateHost, admin, async (req, res) => {
  let hospitals = await Hospital.findById(req.params.id);
  hospitals.name = req.body.name;
  hospitals.contact = req.body.contact;
  hospitals.address = req.body.address;
  await doctors.save();
  return res.send(hospitals);
});


//             //DELETE   
                       
router.delete("/:id" ,admin,async (req, res) => {
  let hospitals = await Hospital.findByIdAndDelete(req.params.id);
  return res.send(hospitals);
});


// // insert a record
router.post( "/", validateHost ,  admin, async (req, res) => {
  let hospitals = new Hospital();
  hospitals.name = req.body.name;
  hospitals.contact = req.body.contact;
  hospitals.qualification = req.body.qualification;
  await hospitals.save();
  return res.send(hospitals);
});
module.exports = router;