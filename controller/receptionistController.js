const Receptionist = require("../models/receptionist");
const Clinic = require("../models/clinic");
const bcrypt = require("bcrypt");
const passport = require("passport");

const createReceptionist = async (req, res) => {
    const { name, gender, email, password, clinicId} = req.body; //extract the values
    console.log("Receptionist Name " + name + " email :" + email + " pass:" + password);

    if (!name || !gender || !email || !password || !clinicId) {
        res.status(400).json({success: false, message:"Please fill in all fields"});
    }
    if (password.length < 6) {
        res.status(400).json({success: false, message:"Password needs to be atleast 6 characters"});
    }
    const clinic = await Clinic.findById({_id: clinicId});
    if (clinic == null) {
        res.status(400).json({success: false, message:"Clinic id does not match with existing clinics"});
    }
    Receptionist.findOne({ email: email }).exec((err, receptionist) => {
        console.log(receptionist);
        if (receptionist) {
            //user already exists
            res.status(400).json({success: false, message:"Receptionist already exists"});
        } else {            
            const newReceptionist = new Receptionist({
                name: name,
                gender: gender,
                email: email,
                clinic: clinicId,
                password: password
            });
            //hash password
            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newReceptionist.password, salt, (err, hash) => {
                    if (err) throw err;
                    //save pass to hash
                    newReceptionist.password = hash;
                    //save receptionist
                    newReceptionist
                        .save()
                        .then(value => {
                            console.log(value);
                            clinic.receptionists.push(newReceptionist);
                            clinic
                            .save()
                            .then(value => {
                                res.status(201).json({success:true, data: newReceptionist });
                            });
                        })
                        .catch(value => {
                            console.log(value)
                            res.status(400).json({success: false, message:value});
                        });
                })
            );
        }
    });
}

const login = (req, res, next)=> {
    passport.authenticate("receptionist", {
        successRedirect:"/receptionist/dashboard",
        failureRedirect: "/receptionist/login",
        failureFlash: true
    })(req, res, next);
};

const receptionistDashboard = async (req, res, next) => {
    console.log(req.user);
    const clinic = await Clinic.findById({ _id: req.user.clinic });
    res.render("receptionistDashboard", {
        receptionist: req.user,
        clinic: clinic
    });
};

module.exports = {
    createReceptionist,
    login,
    receptionistDashboard
}