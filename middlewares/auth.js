const { verifyToken } = require("../lib/auth");
const User = require("../models/User");


async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ error: 'Invalid token' });

  req.user = await User.findById(decoded.id);
  if (!req.user) return res.status(401).json({ error: 'User not found' });

  next();
}

module.exports = requireAuth;
