const Appointment = require("../models/appointment");
const url = require('url');    

const retrieveAppointments = (req, res) => { //retrieve appointments for a doctor
    const { appointment, doctor } = req.query; //extract the values
    let newAppointment = new Date(appointment);
    let end = new Date(newAppointment.getFullYear(),newAppointment.getMonth(),newAppointment.getDate()+1,0,59,59);
    let query = {appointmentDate: {$gte: newAppointment, $lt: end} };
    console.log(doctor)
    Appointment
        .find({ $and: [query, {$doctor: doctor._id}]})
        .populate('clinic')
        .exec((err, appointments) => {
            console.log(appointments)
            req.session.doctor = doctor;
            req.session.appointments = appointments;
            res.redirect("details");       
        });
};

const patientAppointments = (req, res) => {
    let start = new Date();
    let query = {appointmentDate: {$gte: start} };
    Appointment
        .find({ $and: [query, {$patient: req.user._id}]})
        .populate('doctor')
        .exec((err, appointments) => {
            console.log(appointments)
            res.render("patientAppointments", {
                patient: req.user,
                appointments: appointments
            });    
        });
};

const getSlotText = slot => {
    let slotText;
    switch (slot) {
        case 1:
            slotText = "9:01 AM - 09:30 AM";
            break;
        case 2:
            slotText = "09:31 AM - 10:00 AM";
            break;
        case 3:
            slotText = "10:01 AM - 10:30 AM";
            break;
        case 4:
            slotText = "10:31 AM - 11:00 AM";
            break;
        case 5:
            slotText = "11:01 AM - 11:30 AM";
            break;
        case 6:
            slotText = "11:31 AM - 12:00 PM";
            break;
        case 7:
            slotText = "12:01 PM - 12:30 PM";
            break;
        case 8:
            slotText = "12:31 PM - 01:00 PM";
            break;
        case 9:
            slotText = "01:01 PM - 01:30 PM";
            break;
        case 10:
            slotText = "01:31 PM - 02:00 PM";
            break;
        case 11:
            slotText = "02:01 PM - 02:30 PM";
            break;
        case 12:
            slotText = "02:31 PM - 03:00 PM";
            break;
        case 13:
            slotText = "03:01 PM - 03:30 PM";
            break;
        case 14:
            slotText = "03:31 PM - 04:00 PM";
            break;
        case 15:
            slotText = "04:01 PM - 04:30 PM";
            break;
        case 16:
            slotText = "04:31 PM - 05:00 PM";
    }
    return slotText;
};

module.exports = {
    retrieveAppointments,
    patientAppointments,
    getSlotText
};
