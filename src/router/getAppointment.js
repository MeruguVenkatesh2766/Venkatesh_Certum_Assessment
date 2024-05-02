const User = require("../models/user");
const Appointment = require("../models/appointment");

module.exports = async (req, res) => {

    try {
        // Check if the user exists
        // const user = await User.findById();
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }

        // Fetch appointments associated with the user
        const appointments = await Appointment.find();

        res.json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "An error occurred while fetching appointments" });
    }
};
