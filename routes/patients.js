//https://betterprogramming.pub/build-a-login-system-in-node-js-f1ba2abd19a
const express = require("express");
const Patient = require("../models/patient");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require('passport');

//login handle
router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/register", (req, res) => {
    res.render("register");
});
//Register handle
router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body; //extract the values

    let errors = [];
    console.log(" Name " + name + " email :" + email + " pass:" + password);
    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please fill in all fields" }); //show error for empty fields
    }
    //check if match
    if (password !== password2) {
        errors.push({ msg: "passwords dont match" }); // show error if password does not match
    }
    //check if password is more than 6 characters
    if (password.length < 6) {
        errors.push({ msg: "password atleast 6 characters" });
    }
    if (errors.length > 0) {
        // errors found. fail to register
        res.render("register", {
            errors: errors,
            name: name,
            email: email,
            password: password,
            password2: password2
        });
    } else {
        //validation passed
        Patient.findOne({ email: email }).exec((err, patient) => {
            console.log(patient);
            if (patient) {
                //user already exists
                errors.push({ msg: "email already registered" });
                res.render('register',{errors,name,email,password,password2})  
              } else {
                const newPatient = new Patient({
                    name: name,
                    email: email,
                    password: password
                });
                //hash password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newPatient.password, salt, (err, hash) => {
                        if (err) throw err;
                        //save pass to hash
                        newPatient.password = hash;
                        //save user
                        newPatient
                            .save()
                            .then(value => {
                                console.log(value);
                                req.flash(
                                    "success_msg",
                                    "You have now registered!"
                                ); // show success flsash message
                                res.redirect("/patients/login"); //redirect to login
                            })
                            .catch(value => console.log(value));
                    })
                );
                //ELSE statement ends here
            }
        });
    }
});
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/patients/login",
        failureFlash: true
    })(req, res, next);
});

//logout
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "Now logged out");
    res.redirect("/patients/login");
});
module.exports = router;
