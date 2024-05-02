const twilio = require('twilio');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const from = process.env.TWILIO_PHONENUMBER;
const client = new twilio(accountSid, authToken);

function generateOTP() {
    return `Your OTP is ${Math.floor(100000 + Math.random() * 900000)}`;
}

function sendSms(to, body) {
    console.log({
        body,
        from,
        to: to.replace(/\s+/g, ''),
    });

    return client.messages.create({
        body,
        from,
        to: to.replace(/\s+/g, ''),
    });
}

module.exports = { generateOTP, sendSms };
