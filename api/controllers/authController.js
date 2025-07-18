const { signToken } = require('../../lib/auth');
const dbConnect = require('../../lib/database');
const User = require('../../models/User');

exports.register = async (req, res) => {
  await dbConnect();
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }
    const user = await User.create({ email, password });
    const token = signToken(user);
    res.status(201).json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
};

exports.login = async (req, res) => {
  await dbConnect();
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'User does not exist.' });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Incorrect password.' });
  }
  const token = signToken(user);
  res.json({ token, user: { id: user._id, email: user.email } });
};

exports.logout = async (req, res) => {
  // For stateless JWT, logout is handled on the client by deleting the token
  res.json({ message: 'Logged out successfully' });
};
