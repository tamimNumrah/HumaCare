const mongoose = require("../dbConnect");
 
// create an schema
var patientSchema = new mongoose.Schema({
            name: String,
            password: String,
            email:String
        });
 
var patientModel = mongoose.model('patients',patientSchema);
 
module.exports = mongoose.model("Patients", patientModel);