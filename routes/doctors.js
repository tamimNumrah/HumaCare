const express = require("express");
const router = express.Router();
const controller = require('../controller');
const {ensureAuthenticated} = require("../config/auth.js");

//Doctors dashboard
router.get("/doctorDashboard", (req,res)=> {
    controller.doctorController.doctorDashboard(req, res);
});

//Doctors registration
router.get("/registration", (req,res)=> {
    res.render("doctorRegistration");
});
router.post("/registration", (req, res) => {
    controller.doctorController.register(req,res);
});

//Doctor Login
router.get("/login", (req,res)=> {
    res.render("doctorLogin");
});

router.post("/login", (req, res, next) => {
    controller.doctorController.login(req, res, next);
});

//logout
router.get("/logout", (req, res) => {
    controller.doctorController.logout(req, res);
});

//Doctor Create
router.post("/createDoctor", (req,res)=> {
    controller.doctorController.createDoctor(req, res);
});

router.get("/appointments", (req, res) => {
    controller.appointmentController.doctorAppointments(req, res);
});


module.exports = router;