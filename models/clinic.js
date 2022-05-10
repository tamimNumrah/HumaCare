const mongoose = require("mongoose");
const ClinicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    }],
    receptionists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receiptionist"
    }],
});
const Clinic = mongoose.model("Clinic", ClinicSchema);

module.exports = Clinic;