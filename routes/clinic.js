const express = require("express");
const router = express.Router();
const controller = require('../controller');
const {ensureAuthenticated} = require("../config/auth.js");


//Clinic Page
router.get("/clinic", (req,res)=> {
    res.render("clinic");
});

module.exports = router;