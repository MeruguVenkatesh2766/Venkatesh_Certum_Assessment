const mongoose = require('mongoose');

const userWithOTPSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true,
    },
    otpExpires: {
        type: Date,
        required: true,
    },
});

const UserWithOTP = mongoose.model('UserWithOTP', userWithOTPSchema);

module.exports = UserWithOTP;