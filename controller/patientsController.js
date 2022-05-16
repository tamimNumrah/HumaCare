const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const passport = require("passport");
const bcrypt = require("bcrypt");

const register = (req, res) => {
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
                res.render("register", {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
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
};

const login = (req, res, next) => {
    passport.authenticate("patient", {
        successRedirect: "/dashboard",
        failureRedirect: "/patients/login",
        failureFlash: true
    })(req, res, next);
};

const update = (req, res, next) => {
    const { gender, email, birthdate } = req.body; //extract the values
    let errors = [];
    Patient.findOne({ email: email }).exec((err, patient) => {
        if (patient) {
            //user already exists
            patient.gender = gender;
            patient.birthdate = birthdate;
            patient.save().then(value => {
                req.flash("success_msg", "You have updated your profile!"); // show success flsash message
                res.render("dashboard", {
                    patient: patient
                });
            });
        } else {
            errors.push({ msg: "User could not be found in database" });
            res.render("register", { errors });
        }
    });
};

const changePassword = (req, res, next) => {
    const { email, oldPassword, password1, password2 } = req.body; //extract the values
    let errors = [];
    if (password1 !== password2) {
        errors.push({ msg: "passwords dont match" }); // show error if password does not match
    }
    if (password1.length < 6) {
        errors.push({ msg: "password atleast 6 characters" });
    }
    if (errors.length > 0) {
        // errors found. fail to register
        res.render("patientChangePassword", {
            patient: req.user,
            errors: errors
        });
    } else {
        Patient.findOne({ email: email }).exec((err, patient) => {
            if (patient) {
                //user already exists
                bcrypt.compare(
                    oldPassword,
                    patient.password,
                    (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            console.log("password matched. Updating password");
                            bcrypt.genSalt(10, (err, salt) =>
                                bcrypt.hash(password1, salt, (err, hash) => {
                                    if (err) throw err;
                                    //save pass to hash
                                    patient.password = hash;
                                    //save user
                                    patient
                                        .save()
                                        .then(value => {
                                            console.log(value);
                                            req.flash(
                                                "success_msg",
                                                "You have updated password!"
                                            ); // show success flsash message
                                            res.redirect("/dashboard"); //redirect to login
                                        })
                                        .catch(value => console.log(value));
                                })
                            );
                        } else {
                            errors.push({
                                msg: "Password did not match"
                            });
                            res.render("patientChangePassword", {
                                patient: req.user,
                                errors: errors
                            });
                        }
                    }
                );
            } else {
                errors.push({ msg: "User could not be found in database" });
                res.render("patientChangePassword", {
                    patient: req.user,
                    errors: errors
                });
            }
        });
    }
};

const logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "Now logged out");
    res.redirect("/patients/login");
};


module.exports = {
    register,
    login,
    update,
    changePassword,
    logout
};
