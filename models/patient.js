const mongoose = require("mongoose");
const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    birthdate: {
        type: Date
    },
    gender: {
        type: String
    }
});
const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
