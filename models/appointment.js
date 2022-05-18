const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
    appointmentDate: {
        type: Date,
        required: true
    },
    slot: {
        // 1 - 9:01 AM - 09:30 AM, 2 - 09:31 AM - 10:00AM, 3 - 10:01 AM - 10:30 AM, 4 - 10:31 AM - 11:00 AM
        // 5 - 11:01 AM - 11:30 AM, 6 - 11:31 AM - 12:00 PM, 7 - 12:01 PM - 12:30 PM, 8 - 12:31 PM - 01:00 PM
        // 9 - 01:01 PM - 01:30 PM, 10 - 01:31 PM - 02:00 PM, 11 - 02:01 PM - 02:30 PM, 12 - 02:31 PM - 03:00 PM
        // 13 - 03:01 PM - 03:30 PM, 14 - 03:31 PM - 04:00 PM, 15 - 04:01 PM - 04:30 PM, 16 - 04:31 PM - 05:00 PM
        type: Number,
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
    }
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;