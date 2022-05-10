const mongoose = require("mongoose");
const ReceiptionistSchema = new mongoose.Schema({
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
const Receiptionist = mongoose.model("Receiptionist", ReceiptionistSchema);

module.exports = Receiptionist;