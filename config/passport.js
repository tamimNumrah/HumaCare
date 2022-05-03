//Patient authentication with Passport
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Patient = require("../models/patient");

module.exports = function(passport) {
    passport.use(
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
                                        message: "pass incorrect"
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
    passport.serializeUser(function(patient, done) {
        done(null, patient.id);
    });

    passport.deserializeUser(function(id, done) {
        Patient.findById(id, function(err, patient) {
            done(err, patient);
        });
    });
};
