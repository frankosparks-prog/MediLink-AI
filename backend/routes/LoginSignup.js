// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const { authenticate, isAdmin } = require('../middleware/AuthMiddleware');

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// 🟢 Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role, profile } = req.body;
    
 if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    // Check if user exists
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Approval logic: only patients auto-approved
    const isApproved = role === "patient";

    const newUser = new User({
      username,
      email,
      password,
      role: role || "patient",
      profile: profile || {},
      isApproved
    });

    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 🔐 Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
        profile: user.profile
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 🗒️ Get All Users (Admin only)
router.get('/users', authenticate, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// ✏️ Update User
router.put('/users/:id', authenticate, async (req, res) => {
  try {
    const { username, email, role, profile, isApproved } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, role, profile, isApproved },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// 🗑️ Delete User
router.delete('/users/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

module.exports = router;
