const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
    appointmentDate: {
        type: Date,
        required: true
    },
    slot: {
        // 1 - 9:01 AM - 09:30 AM, 2 - 09:31 AM - 10:00AM, 3 - 10:01AM - 10:30 AM, 4 - 10:31AM - 11:00 AM
        // 5 - 11:01 AM - 11:30 AM, 6 - 11:31 AM - 12:00PM, 7 - 12:01PM - 12:30 PM, 8 - 12:31PM - 01:00 PM
        // 9 - 01:01 PM - 01:30 PM, 10 - 01:31 PM - 02:00PM, 11 - 02:01PM - 02:30 PM, 12 - 02:31PM - 03:00 PM
        // 13 - 03:01 PM - 03:30 PM, 14 - 03:31 PM - 04:00PM, 15 - 04:01PM - 04:30 PM, 16 - 04:31PM - 05:00 PM
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

AppointmentSchema.methods.slotRange = function() {
    return getSlotText(this.slot);
};

function getSlotText(slot) {
    let slotText;
    switch (slot) {
        case 0:
            slotText = "Sunday";
            break;
        case 1:
            slotText = "Monday";
            break;
        case 2:
            slotText = "Tuesday";
            break;
        case 3:
            slotText = "Wednesday";
            break;
        case 4:
            slotText = "Thursday";
            break;
        case 5:
            slotText = "Friday";
            break;
        case 6:
            slotText = "Saturday";
            break;
        case 7:
            slotText = "Sunday";
            break;
        case 8:
            slotText = "Monday";
            break;
        case 9:
            slotText = "Tuesday";
            break;
        case 10:
            slotText = "Wednesday";
            break;
        case 11:
            slotText = "Thursday";
            break;
        case 12:
            slotText = "Friday";
            break;
        case 13:
            slotText = "Saturday";
            break;
        case 14:
            slotText = "Sunday";
            break;
        case 15:
            slotText = "Monday";
            break;
        case 16:
            slotText = "Tuesday";
    }
    return slotText;
}

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;