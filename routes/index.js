const express = require("express");
const {ensureAuthenticated} = require("../config/auth.js")
const router = express.Router();
const controller = require('../controller');

//login page
router.get("/", (req, res) => {
    res.render("home", {
        show_registration_modal: false,
        show_login_modal: false
    });
});
router.get("/home", (req, res) => {
    res.render("home", {
        show_registration_modal: req.query.show_registration_modal,
        show_login_modal: req.query.show_login_modal
    });
});
router.get("/contact", (req, res) => {
    res.render("contact");
});
router.post("/contact", (req, res, next) => {
    controller.contactController.postMessage(req, res, next);
});
//register page
router.get("/register", (req, res) => {
    res.render("register");
});
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.render("dashboard", {
        patient: req.user
    });
});
router.get("/about", (req, res) => {
    res.render("aboutUs");
});
module.exports = router;
