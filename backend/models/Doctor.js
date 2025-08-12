import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    location: { type: String, required: true },
    availability: { type: String, required: true }, // e.g., "Mon - Fri, 9AM - 3PM"
    image: { type: String }, // profile photo URL
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    approved: { type: Boolean, default: false }, // Admin approval
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
