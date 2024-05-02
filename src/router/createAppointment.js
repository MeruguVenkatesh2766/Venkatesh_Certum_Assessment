const User = require("../models/user");
const Appointment = require("../models/appointment");

module.exports = async (req, res) => {
    const { userId, doctorId, date } = req.body;
    // const userId = req.query.userId; // Extract userId from query parameters

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new appointment associated with the user
        const newAppointment = new Appointment({ userId, doctorId, date });
        await newAppointment.save();

        res.status(201).json(newAppointment);
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ message: "An error occurred while creating the appointment" });
    }
};
