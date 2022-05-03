const express = require("express");
const {ensureAuthenticated} = require("../config/auth.js")
const router = express.Router();
//login page
router.get("/", (req, res) => {
    res.render("home");
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

module.exports = router;
