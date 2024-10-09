const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  try {
    const newuserdata = new User(req.body);
    const { username, email, password, phone } = newuserdata;
    const finduser = await User.findOne({ email: email });
    if (finduser !== null) {
      return res.status(400).json({ message: "Email Already Exists!" });
    }
    if (!username || !phone || !email || !password) {
      return res.status(400).json({ message: "All fields required!" });
    }
    const savedata = await newuserdata.save();
    return res.status(200).json(savedata);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userdata = new User(req.body);
    const { email, password } = userdata;
    if (!email || !password) {
      res.status(400).json({ message: "Invalid Credentials" });
    }
    const finduser = await User.findOne({ email: email });
    if (finduser === null) {
      res.status(404).json({ message: "Invalid Email !" });
    }
    if (finduser.email === email && finduser.password === password) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(404).json({ message: "Invalid Password !" });
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
