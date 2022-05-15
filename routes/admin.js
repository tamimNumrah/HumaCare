const express = require ("express");
const router =express.Router();
const controller = require('../controller');

// Registration
router.get("/register", (req, res) => {
    res.render("adminRegistration");
});
router.post("/register", (req, res) => {
    controller.adminController.register(req,res);
});

//Login
router.get("/login",(req,res)=> {
    res.render("adminLogin");
})
router.post("/login", (req, res, next) => {
    controller.adminController.login(req, res, next);
});

//Dashboard
router.get("/dashboard",(req,res)=> {
    res.render("adminDashboard");
});
module.exports = router;