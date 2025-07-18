const { signToken } = require('../../lib/auth');
const dbConnect = require('../../lib/database');
const User = require('../../models/User');

exports.register = async (req, res) => {
  await dbConnect();
  const { email, password } = req.body;
  console.log('requse ', req.body);
  try {
    const user = await User.create({ email, password });
    const token = signToken(user);
    res.status(201).json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
};

exports.login = async (req, res) => {
  await dbConnect();
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = signToken(user);
  res.json({ token, user: { id: user._id, email: user.email } });
};
