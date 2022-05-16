const Doctor = require("../models/doctor");
const Clinic = require("../models/clinic");
const bcrypt = require("bcrypt");

const createDoctor = async (req, res) => {
    const { name, gender, email, password, specialization, clinicId, available} = req.body; //extract the values
    console.log("Doctor Name " + name + " email :" + email + " pass:" + password);

    if (!name || !gender || !email || !password || !specialization || !clinicId || !available) {
        res.status(400).json({success: false, message:"Please fill in all fields"});
    }
    if (password.length < 6) {
        res.status(400).json({success: false, message:"Password needs to be atleast 6 characters"});
    }
    const clinic = await Clinic.findById({_id: clinicId});
    if (clinic == null) {
        res.status(400).json({success: false, message:"Clinic id does not match with existing clinics"});
    }
    Doctor.findOne({ email: email }).exec((err, doctor) => {
        console.log(doctor);
        if (doctor) {
            //user already exists
            res.status(400).json({success: false, message:"Doctor already exists"});
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
                                res.status(201).json({success:true, data: newDoctor });
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

const search = async (req, res) => {
    const { doctorSearch } = req.body;
    Doctor
        .find(
            { $text: { $search: doctorSearch }})
        .populate('clinic')
        .exec((err, docs) => {
            res.render("dashboard", {
                doctors: docs
            });
        });
}

module.exports = {
    createDoctor,
    search
}