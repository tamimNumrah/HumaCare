const Clinic = require("../models/clinic");

const createClinic = (req, res) => {
    const { name, location } = req.body; //extract the values
    console.log(name)
    console.log(location)
    const newClinic = new Clinic({
        name: name,
        location: location
    });
    newClinic
        .save()
        .then(value => {
            console.log(value);
            res.status(201).json({success:true, data: newClinic });
        })
        .catch(value => {
            console.log(value)
            res.status(400).json({success: false, message:value});
        });
}

module.exports = {
    createClinic
}