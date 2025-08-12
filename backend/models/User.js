// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["patient", "doctor", "pharmacy", "admin"],
    default: "patient"
  },
  profile: {
    fullName: String,
    phone: String,
    address: String,
    location: String, // for proximity-based doctor matching
    specialization: String, // for doctors
    licenseNumber: String, // for doctors/pharmacy
  },
  isApproved: { type: Boolean, default: false }, // Admin approval
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
