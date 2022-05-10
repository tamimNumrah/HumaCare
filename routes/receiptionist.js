const express = require("express");
const router = express.Router();
const controller = require('../controller');
const {ensureAuthenticated} = require("../config/auth.js");


//Receiptionist dashboard
router.get("/dashboard", (req,res)=> {
    res.render("receiptionistDashboard");
});

//Receiptionist Register
router.get("/dashboard", (req,res)=> {
    res.render("receiptionist");
});

//Receiptionist Login
router.get("/login", (req,res)=> {
    res.render("receiptionistLogin");
});

module.exports = router;