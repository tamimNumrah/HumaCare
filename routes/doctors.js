const express = require("express");
const router = express.Router();
const controller = require('../controller');
const {ensureAuthenticated} = require("../config/auth.js");

//Doctors dashboard
router.get("/dashboard", (req,res)=> {
    res.render("doctorDashboard");
});

//Doctors registration
router.get("/registration", (req,res)=> {
    res.render("doctorRegistration");
});

//Doctor Login
router.get("/login", (req,res)=> {
    res.render("doctorLogin");
});

module.exports = router;