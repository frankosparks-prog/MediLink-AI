// models/MedicationHistory.js
const mongoose = require("mongoose");

const medicationHistorySchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  dosage: String,
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ["Ongoing", "Completed"], default: "Ongoing" },
  linkedOrder: { type: mongoose.Schema.Types.ObjectId, ref: "Order" }
}, { timestamps: true });

module.exports = mongoose.model("MedicationHistory", medicationHistorySchema);
