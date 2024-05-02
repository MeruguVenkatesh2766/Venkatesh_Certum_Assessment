// models.js
const mongoose = require('mongoose');

// Appointment schema
const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
});


const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;