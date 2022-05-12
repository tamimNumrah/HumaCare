const mongoose = require("mongoose");
const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    specialization: {
        type: String
    },
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic"
    },
    available: {
        type: [String],
        default: ["sunday", "monday", "tuesday", "wednesday", "thursday"]
    }
});
const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;