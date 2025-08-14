// routes/profile.js
const express = require("express");
const User = require("../models/User.js");
const Appointment = require("../models/Appointment.js");
const MedicationHistory = require("../models/MedicationHistory.js");
const MedicationOrder = require("../models/MedicationOrder.js");
const SymptomRecord = require("../models/SymptomRecords.js");

const router = express.Router();

// GET Patient Profile
router.get("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;

    // 1. Basic user details
    const user = await User.findById(patientId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // 2. Appointments
    const appointments = await Appointment.find({ patient: patientId })
      .populate("doctor", "profile.fullName profile.specialization email")
      .sort({ date: -1 });

    // 3. Medication History
    const medicationHistory = await MedicationHistory.find({ patient: patientId })
      .populate("linkedOrder", "status createdAt");

    // 4. Orders
    const orders = await MedicationOrder.find({ patient: patientId })
      .populate("items.medication", "name description")
      .sort({ createdAt: -1 });

    // 5. Symptom Records
    const symptoms = await SymptomRecord.find({ patient: patientId })
      .sort({ createdAt: -1 });

    res.json({
      user,
      appointments,
      medicationHistory,
      orders,
      symptoms
    });

  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
