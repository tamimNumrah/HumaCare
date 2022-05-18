//https://betterprogramming.pub/build-a-login-system-in-node-js-f1ba2abd19a
const express = require("express");
const router = express.Router();
const controller = require('../controller');
const {ensureAuthenticated} = require("../config/auth.js");

//login handle
router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/register", (req, res) => {
    res.render("register");
});
router.get("/update", ensureAuthenticated, (req, res) => {
    res.render("patientProfileUpdate", {
        patient: req.user
    });
});
router.get("/changePassword", ensureAuthenticated, (req, res) => {
    res.render("patientChangePassword", {
        patient: req.user
    });
});
router.get("/details", (req, res) => {
    res.render("doctorDetails", {
        patient: req.user,
        doctor: req.session.doctor,
        appointments: req.session.appointments
    });
});

//Register handle
router.post("/register", (req, res) => {
    controller.patientsController.register(req, res);
});
router.post("/login", (req, res, next) => {
    controller.patientsController.login(req, res, next);
});
router.post("/update", (req, res, next) => {
    controller.patientsController.update(req, res, next);
});
router.post("/changePassword", (req, res, next) => {
    controller.patientsController.changePassword(req, res, next);
});

//Search for Doctors
router.post("/search",(req, res, next)=>{ //search for doctor in doctors controller
    controller.doctorController.search(req,res);
});

//logout
router.get("/logout", (req, res) => {
    controller.patientsController.logout(req, res);
});
//Open doctor details
router.post("/details", ensureAuthenticated, (req, res, next) => {
    controller.patientsController.details(req, res, next);
});

router.get("/retrieveAppointments", (req, res) => {
    controller.appointmentController.retrieveAppointments(req, res);
});

module.exports = router;
