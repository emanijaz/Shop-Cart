
const bcrypt = require('bcrypt');

const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');

// Registration endpoint
exports.signup = catchAsyncError(async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});