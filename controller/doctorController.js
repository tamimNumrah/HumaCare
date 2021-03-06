const Doctor = require("../models/doctor");
const Clinic = require("../models/clinic");
const passport = require("passport");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const createDoctor = async (req, res) => {
    const { name, gender, email, password, specialization, clinicId, available } = req.body; //extract the values
    console.log("Doctor Name " + name + " email :" + email + " pass:" + password);

    if (!name || !gender || !email || !password || !specialization || !clinicId || !available) {
        res.status(400).json({ success: false, message: "Please fill in all fields" });
    }
    if (password.length < 6) {
        res.status(400).json({ success: false, message: "Password needs to be atleast 6 characters" });
    }
    const clinic = await Clinic.findById({ _id: clinicId });
    if (clinic == null) {
        res.status(400).json({ success: false, message: "Clinic id does not match with existing clinics" });
    }
    Doctor.findOne({ email: email }).exec((err, doctor) => {
        console.log(doctor);
        if (doctor) {
            //user already exists
            res.status(400).json({ success: false, message: "Doctor already exists" });
        } else {
            const newDoctor = new Doctor({
                name: name,
                gender: gender,
                email: email,
                specialization: specialization,
                available: available,
                clinic: clinicId,
                password: password
            });
            //hash password
            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newDoctor.password, salt, (err, hash) => {
                    if (err) throw err;
                    //save pass to hash
                    newDoctor.password = hash;
                    //save user
                    newDoctor
                        .save()
                        .then(value => {
                            console.log(value);
                            clinic.doctors.push(newDoctor);
                            clinic
                                .save()
                                .then(value => {
                                    res.status(201).json({ success: true, data: newDoctor });
                                });
                        })
                        .catch(value => {
                            console.log(value)
                            res.status(400).json({ success: false, message: value });
                        });
                })
            );
        }
    });
}

const register = (req, res) => {
    const { email } = req.body;

    let errors = [];
    console.log("email:" + email);
    if (!email) {
        errors.push({ msg: "Please fill in your email" });
    } else {
        async function main() {

            //create reusable transporter object
            let transporter = nodemailer.createTransport({
                host: "outlook.com",
                port: 587,
                secure: false,
                auth: {
                    user: 'humacareregister@outlook.com',
                    pass: 'admin123humacare'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"HumaCare Registration" <humacareregister@outlook.com>',
                to: email,
                subject: 'Doctor Registration Confirmation',
                text: 'Welcome to HumaCare',
                html: '<h3>Thanks for registering with Huma Care<h3><br><p>To complete your registration, please provide your doctor ID lisense and would take 48hrs to verify your details.</p>'
            });

            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        main().catch(console.error);
    }
    //req.flash("sucess_msg","Please check your email to register");
    res.render("doctorRegistration",  {
        success_msg: "Please check your email to register."
    });
};

const login = (req, res, next) => {
    passport.authenticate("doctor", {
        successRedirect: "/doctors/doctorDashboard",
        failureRedirect: "/doctors/login",
        failureFlash: true
    })(req, res, next);
};
const logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "Now logged out");
    res.redirect("/doctors/login");
};
const search = async (req, res) => {
    const { doctorSearch } = req.body;
    Doctor
        .find(
            { $text: { $search: doctorSearch } })
        .populate('clinic')
        .exec((err, docs) => {
            res.render("dashboard", {
                doctors: docs
            });
        });
}

const doctorDashboard = async (req, res, next) => {
    console.log(req.user);
    const clinic = await Clinic.findById({ _id: req.user.clinic });
    res.render("doctorDashboard", {
        doctor: req.user,
        clinic: clinic
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
        res.render("doctorChangePassword", {
            doctor: req.user,
            errors: errors
        });
    } else {
        Doctor.findOne({ email: email }).exec((err, doctor) => {
            if (doctor) {
                //user already exists
                bcrypt.compare(
                    oldPassword,
                    doctor.password,
                    (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            console.log("password matched. Updating password");
                            bcrypt.genSalt(10, (err, salt) =>
                                bcrypt.hash(password1, salt, (err, hash) => {
                                    if (err) throw err;
                                    //save pass to hash
                                    doctor.password = hash;
                                    //save user
                                    doctor
                                        .save()
                                        .then(value => {
                                            console.log(value);
                                            req.flash(
                                                "success_msg",
                                                "You have updated password!"
                                            ); // show success flsash message
                                            res.redirect("/doctors/login"); //redirect to login
                                        })
                                        .catch(value => console.log(value));
                                })
                            );
                        } else {
                            errors.push({
                                msg: "Password did not match"
                            });
                            res.render("doctorChangePassword", {
                                doctor: req.user,
                                errors: errors
                            });
                        }
                    }
                );
            } else {
                errors.push({ msg: "Doctor could not be found in database" });
                res.render("doctorChangePassword", {
                    doctor: req.user,
                    errors: errors
                });
            }
        });
    }
};

module.exports = {
    createDoctor,
    login,
    logout,
    search,
    doctorDashboard,
    changePassword,
    register
}