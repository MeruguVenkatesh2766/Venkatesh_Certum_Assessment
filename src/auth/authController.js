const User = require('../models/userOTP');
const { generateOTP, sendSms } = require('../utils/twilio');

exports.sendOTP = async (req, res) => {
    const { mobileNumber } = req.body;

    // Check if the mobile number already exists
    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
        return res.status(400).json({ error: 'Mobile number already registered' });
    }

    // Generate and send OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

    try {
        await sendSms(mobileNumber, otp); // Sending only OTP, not the message "Your OTP is <OTP>"
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send OTP' });
    }

    // Save the OTP and expiration time in the database
    const newUser = new User({ mobileNumber, otp, otpExpires });
    await newUser.save();
};

exports.verifyOTP = async (req, res) => {
    const { mobileNumber, otp } = req.body;

    // Find the user by mobile number and verify OTP
    const user = await User.findOne({ mobileNumber });
    if (!user) {
        return res.status(400).json({ error: 'Invalid mobile number' });
    }

    if (user.otp !== otp) {
        return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (user.otpExpires < new Date()) {
        return res.status(400).json({ error: 'OTP expired' });
    }

    // OTP is valid, proceed with login or registration
    // You can generate a JWT token and send it back in the response
    res.status(200).json({ verified: 'Verified successfully' });
};
