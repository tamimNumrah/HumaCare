//https://betterprogramming.pub/build-a-login-system-in-node-js-f1ba2abd19a
const express = require("express");
const router = express.Router();
const controller = require('../controller')

//login handle
router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/register", (req, res) => {
    res.render("register");
});
//Register handle
router.post("/register", (req, res) => {
    controller.patientsController.register(req, res);
});
router.post("/login", (req, res, next) => {
    controller.patientsController.login(req, res, next);
});

//logout
router.get("/logout", (req, res) => {
    controller.patientsController.logout(req, res);
});
module.exports = router;
