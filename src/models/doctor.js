// models.js
const mongoose = require('mongoose');

// Doctor schema
const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
});


const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;