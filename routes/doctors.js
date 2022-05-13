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

//Doctor Create
router.post("/createDoctor", (req,res)=> {
    controller.doctorController.createDoctor(req, res);
});

/*router.get("/adminRegistration", (req,res)=> {
    res.render("adminRegistration");
});*/
module.exports = router;