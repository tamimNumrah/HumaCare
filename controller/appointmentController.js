const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const url = require('url');    
const Patient = require("../models/patient");
const Receptionist = require("../models/receptionist");

const retrieveAppointments = (req, res) => { //retrieve appointments for a doctor
    const { appointment, doctorId } = req.query; //extract the values
    let newAppointment = new Date(appointment);
    let end = new Date(newAppointment.getFullYear(),newAppointment.getMonth(),newAppointment.getDate()+1,0,59,59);
    let query = {appointmentDate: {$gte: newAppointment, $lt: end} };
    Doctor.findOne({ _id: doctorId }).populate('clinic').exec((err, doctor) => {
        Appointment
        .find({ $and: [query, {$doctor: doctorId}]})
        .populate('clinic')
        .exec((err, appointments) => {
            req.session.appointment = appointment;
            req.session.doctor = doctor;
            req.session.clinic = doctor.clinic;
            req.session.appointments = appointments;
            res.redirect("details");       
        });
    });
};

const bookAppointment = (req, res) => {
    const { slot, doctorId, date, clinicId, patientId} = req.body; //extract the values
    const appointment = new Appointment({
        slot: slot,
        doctor: doctorId,
        appointmentDate: date,
        clinic: clinicId,
        patient: patientId
    });
    appointment
    .save()
    .then(value => {
        req.flash(
            "success_msg",
            "You have now booked your appointment!"
        ); // show success flsash message
        res.redirect("/dashboard");
    })
    .catch(value => console.log(value));
};

const cancelAppointment = (req, res) => {
    const { appointmentId } = req.body; //extract the values
    Appointment.findByIdAndDelete(appointmentId)
    .then(value => {
        req.flash(
            "success_msg",
            "You have now removed your appointment!"
        ); // show success flsash message
        res.redirect("/dashboard");
    })
    .catch(value => console.log(value));
};


const patientAppointments = (req, res) => {
    let start = new Date();
    const patientId = req.user._id
    let query = {appointmentDate: {$gte: start} };
    Appointment
        .find({ $and: [query, {patient: patientId}]})
        .populate('doctor')
        .populate('clinic')
        .exec((err, appointments) => {
            console.log(appointments);
            res.render("patientAppointments", {
                patient: req.user,
                appointments: appointments
        });    
    });
};

const doctorAppointments = (req, res) => {
    let start = new Date();
    const doctorId = req.user._id
    let query = {appointmentDate: {$gte: start} };
    Appointment
        .find({ $and: [query, {doctor: doctorId}]})
        .populate('patient')
        .populate('clinic')
        .exec((err, appointments) => {
            res.render("doctorAppointments", {
                doctor: req.user,
                appointments: appointments
        });    
    });
};

const receptionistAppointments = (req, res) => {
    let start = new Date();
    const clinicId = req.user.clinic
    let query = {appointmentDate: {$gte:start} };
    Appointment
    .find({ $and: [query, {clinic: clinicId}]})
    .populate('doctor')
    .populate('patient')
    .populate('clinic')
    .exec((err, appointments)=> {
        res.render("receptionistAppointments", {
            receptionist: req.user,
            appointments:appointments
        })
    })
}

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
    bookAppointment,
    cancelAppointment,
    patientAppointments,
    doctorAppointments,
    receptionistAppointments,
    getSlotText
};
