const express = require("express");
const router = express.Router();
const controller = require('../controller');
const {ensureAuthenticated} = require("../config/auth.js");

//Doctors dashboard
router.get("/doctorDashboard", (req,res)=> {
    res.render("doctorDashboard", {
        doctor: req.user
    });
});

//Doctors registration
router.get("/registration", (req,res)=> {
    res.render("doctorRegistration");
});

//Doctor Login
router.get("/login", (req,res)=> {
    res.render("doctorLogin");
});

router.post("/login", (req, res, next) => {
    controller.doctorController.login(req, res, next);
});

//Doctor Create
router.post("/createDoctor", (req,res)=> {
    controller.doctorController.createDoctor(req, res);
});

router.get("/appointments", (req, res) => {
    controller.appointmentController.doctorAppointments(req, res);
});


module.exports = router;