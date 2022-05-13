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
module.exports = router;