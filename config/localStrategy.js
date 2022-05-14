//Patient authentication with Passport
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Patient = require("../models/patient");
const Admin = require("../models/admin");

module.exports = function(passport) {
    passport.use(
        'patient',
        new LocalStrategy( // user localStrategy strategy
            { usernameField: "email" },
            (email, password, done) => {
                //match Patient
                Patient.findOne({ email: email })
                    .then(patient => {
                        if (!patient) {
                            return done(null, false, {
                                message: "that email is not registered"
                            });
                        }
                        //match pass
                        bcrypt.compare(
                            password,
                            patient.password,
                            (err, isMatch) => {
                                if (err) throw err;

                                if (isMatch) {
                                    return done(null, patient);
                                } else {
                                    return done(null, false, {
                                        message: "Password is not correct"
                                    });
                                }
                            }
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        )
    );

    passport.use(
        'admin',
        new LocalStrategy( // user localStrategy strategy
            { usernameField: "userName" },
            (userName, password, done) => {
                //match Admin
                Admin.findOne({ userName:userName })
                    .then(admin => {
                        if (!admin) {
                            console.log("not found")
                            return done(null, false, {
                                message: "Email is not registered"
                            });
                        }
                        //match pass
                        bcrypt.compare(
                            password,
                            admin.password,
                            (err, isMatch) => {
                                if (err) throw err;

                                if (isMatch) {
                                    return done(null, admin);
                                } else {
                                    return done(null, false, {
                                        message: "Password is not correct"
                                    });
                                }
                            }
                        );
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        )
    );

    passport.serializeUser(function(user, done) {
        if (user.constructor.modelName == "Patient") {
            var key = {
                id: user.id,
                type: "Patient"
            }
            done(null, key);
        } else if (user.constructor.modelName == "Admin") {
            var key = {
                id: user.id,
                type: "Admin"
            }
            done(null, key);
        }
    });

    passport.deserializeUser(function(key, done) {
        if (key.type == "Patient") {
            Patient.findById(key.id, function(err, patient) {
                done(err, patient);
            });
        } else if (key.type == "Admin") {
            Admin.findById(key.id, function(err, admin) {
                done(err, admin);
            });
        }
    });
};




