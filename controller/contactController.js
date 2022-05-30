const Contact = require("../models/contact");

const postMessage = (req, res, next) => {
    const { name, email, message, phone } = req.body; //extract the values

    let errors = [];
    console.log(
        " Name " +
            name +
            " email :" +
            email +
            " message:" +
            message +
            " phone:" +
            phone
    );
    if (!name || !email || !message || !phone) {
        errors.push({ msg: "Please fill in all fields" }); //show error for empty fields
    }
    //check if match
    if (errors.length > 0) {
        // errors found. fail to register
        res.render("contact", {
            errors: errors,
            name: name,
            email: email,
            message: message,
            phone: phone
        });
    } else {
        //validation passed
        const contact = new Contact({
            name: name,
            email: email,
            message: message,
            phone: phone
        });
        contact
            .save()
            .then(value => {
                console.log(value);
                res.render("contact", {
                    success_msg: "We have received your message."
                });
            })
            .catch(value => console.log(value));
    }
};

module.exports = {
    postMessage
};
