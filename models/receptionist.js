const mongoose = require("mongoose");
const ReceptionistSchema = new mongoose.Schema({
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
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic"
    },
});
const Receptionist = mongoose.model("Receptionist", ReceptionistSchema);

module.exports = Receptionist;