const express = require("express");
// const validateUser = require("../../middlewares/validateUser");
let router = express.Router();
const jwt = require ("jsonwebtoken");
const config = require ("config");
const bcrypt = require ("bcrypt");
var  { User } = require ("../../models/userModel");



      //login and register

router.post("/login" ,async function (req, res, next) {
  let findLogin = await User.findOne({email:req.body.email});
  if (!findLogin) return res.status(400).send("User not registered ");
  let userValid = await bcrypt.compare(req.body.password,findLogin.password);
  if (!userValid) return res.status(401).send("Password not Correct");
  let userToken = jwt.sign(
    {
      _id: findLogin._id,name: findLogin.name, role: findLogin.role,
    },
    config.get("jwtPrivateKey")
  );
   res.send(userToken);
});


router.post("/register",async function (req, res, next) {
  let find1 = await User.findOne( 
    { email: req.body.email });

  if (find1) return res.status(400).send("User with given email id already exists");
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.role = req.body.role;
  await user.generateHashedPassword();
  await user.save();
  let userToken = jwt.sign(
    {
      _id: user._id, name: user.name, role: user.role
    },
    config.get("jwtPrivateKey")
  )
  res.send(userToken);
});

module.exports = router;