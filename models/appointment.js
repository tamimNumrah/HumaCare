const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
    timeStart: {
        type: Date,
        required: true
    },
    timeEnd: {
        type: Date,
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic",
        required: true
    },
    purpose: {
        type: String
    },
});
const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;