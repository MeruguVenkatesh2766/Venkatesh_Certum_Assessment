const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    // Generate JWT token upon successful signup
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10d' });
    res.status(201).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while signing up' });
  }
}
