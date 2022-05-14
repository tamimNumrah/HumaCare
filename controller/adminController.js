const Admin = require("../models/admin");
//const passport = require('passport');
const bcrypt = require("bcrypt");

const register = (req,res) => {
    const { name ,userName, password, confirmPassword} =req.body;
    let errors =[];
    console.log("Name:" + name + "Username:" + userName + "password:" +password);
    if(!name || !userName || !password || !confirmPassword) {
        errors.push({msg:"Please fill in all fields"}); // Error message to be dispalyed when all the input fields in registration are not provided
    }
    //To check whether the admin has entered both passowrd and confirm password same
    if (password !== confirmPassword) {
        errors.push({msg: "Passwords does not match"});
    }
    // Password should be more than 6 characters
    if(password.length < 6) {
        errors.push({msg:"Passwords should be atleast 6 characters"});
    }
    if (errors.length > 0) {
        res.render("adminRegistration", {
            errors: errors,
            name: name,
            userName: userName,
            password: password,
            confirmPassword: confirmPassword
        });
    } else {
        //All fields are provided passing all validations
        Admin.findOne({ userName: userName}).exec((err,admin) => {
            console.log(admin);
            if (admin) {
                //user exists
                errors.push({msg:"Username already registered"});
                res.render('adminRegistration',{errors,name,userName,password,confirmPassword})
                
            } else {
                const newAdmin = new Admin ({
                    name:name,
                    userName: userName,
                    password: password
                });
                //To hash password before saving it to database
                bcrypt.genSalt(10,(err, salt) =>
                bcrypt.hash(newAdmin.password, salt, (err,hash) => {
                    if (err) throw err;
                    //Save password as hash
                    newAdmin.password=hash;
                    //Save Admin details
                    newAdmin.save().then(value => {
                        console.log(value);
                        req.flash(
                            "success_msg", "You have now registered!"
                        );
                        //res.redirect("/");
                    })
                    .catch(value => console.log(value));
                })
                );
            }
        });
    }
}

module.exports = {
    register
}