const express = require("express");
const router = express.Router();
const isLogggedIn = require('./middlewware/isLoggedIn')
const login = require('./auth/login')
const signUp = require('./auth/signup')

const createAppointment = require('./router/createAppointment')
const getAppointments = require('./router/getAppointment')
const doctorsWithAppointments = require('./router/doctorsWithAppointments')
const authController = require('./auth/authController');

router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);

router.post('/api/login', login)
router.post('/api/sign-up', signUp)
router.post('/api/appointment', isLogggedIn, createAppointment)
router.get('/api/appointments', isLogggedIn, getAppointments)
router.get('/api/doctors/appointments', isLogggedIn, doctorsWithAppointments)
router.get('/about', ((req, res) => {
    res.send("Hello About")
}))

module.exports = router;