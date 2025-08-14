const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware: verify token and set `req.user`
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware: check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

module.exports = { authenticate, isAdmin };