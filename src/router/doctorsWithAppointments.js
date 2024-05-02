const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");

module.exports = async (req, res) => {
    try {
        // Fetch distinct doctorIds from appointments
        const distinctDoctorIds = await Appointment.distinct('doctorId');

        // Fetch doctors with appointments using distinct doctorIds
        const doctorsWithAppointments = await Doctor.find({
            _id: { $in: distinctDoctorIds },
        });

        res.json(doctorsWithAppointments);
    } catch (error) {
        console.error("Error fetching doctors with appointments:", error);
        res.status(500).json({ message: "An error occurred while fetching doctors with appointments" });
    }
};
