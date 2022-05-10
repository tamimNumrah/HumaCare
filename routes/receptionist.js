const express = require("express");
const router = express.Router();
const controller = require('../controller');
const {ensureAuthenticated} = require("../config/auth.js");


//Receiptionist dashboard
router.get("/dashboard", (req,res)=> {
    res.render("receptionistDashboard");
});

//Receiptionist Register
router.get("/registration", (req,res)=> {
    res.render("receptionist");
});

//Receiptionist Login
router.get("/login", (req,res)=> {
    res.render("receptionistLogin");
});

module.exports = router;