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

//logout
router.get("/logout", (req, res) => {
    controller.patientsController.logout(req, res);
});
module.exports = router;
