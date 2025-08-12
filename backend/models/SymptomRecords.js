// models/SymptomRecord.js
const mongoose = require("mongoose");

const symptomRecordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symptoms: [String],
  aiDiagnosis: String,
  suggestedMedications: [String],
  requiresDoctor: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("SymptomRecord", symptomRecordSchema);
