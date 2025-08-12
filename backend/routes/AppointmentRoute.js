// routes/appointments.js
import express from "express";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * 📌 Get all doctors (search & filter)
 */
router.get("/doctors", async (req, res) => {
  try {
    const { search = "", specialty = "" } = req.query;
    let query = { role: "doctor", approved: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    if (specialty && specialty !== "All") {
      query.specialty = specialty;
    }

    const doctors = await User.find(query);
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
});

/**
 * 📌 Book an appointment
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { doctorId, specialty, date, time, notes } = req.body;

    if (!doctorId || !specialty || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure doctor exists, is approved, and has role "doctor"
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor" || !doctor.approved) {
      return res.status(404).json({ message: "Doctor not found or not approved" });
    }

    const appointment = new Appointment({
      patient: req.user.id, // from verifyToken
      doctor: doctorId,
      specialty,
      date,
      time,
      notes: notes || "",
    });

    await appointment.save();
    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
});

/**
 * 📌 Get logged-in patient's appointments
 */
router.get("/my", verifyToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate("doctor", "name specialty location image")
      .sort({ date: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
});

export default router;
