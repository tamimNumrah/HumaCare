const Appointment = require("../models/appointment");

const retrieveAppointments = (req, res) => { //retrieve appointments for a doctor
    const { appointment, doctor } = req.query; //extract the values
    let newAppointment = new Date(appointment);
    let end = new Date(newAppointment.getFullYear(),newAppointment.getMonth(),newAppointment.getDate()+1,0,59,59);
    let query = {appointmentDate: {$gte: newAppointment, $lt: end} };
    Appointment
        .find({ $and: [query, {$doctor: doctor._id}]})
        .populate('clinic')
        .exec((err, appointments) => {
            res.render("doctorDetails", {
                patient: req.user,
                doctor: doctor,
                appointments: appointments
            });       
        });
};

module.exports = {
    retrieveAppointments
}