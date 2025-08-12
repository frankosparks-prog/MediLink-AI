// models/MedicationOrder.js
import mongoose from "mongoose";

const medicationOrderSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        medication: { type: mongoose.Schema.Types.ObjectId, ref: "Medication", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    deliveryAddress: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid", "Refunded"],
      default: "Unpaid",
    },
  },
  { timestamps: true }
);

export default mongoose.model("MedicationOrder", medicationOrderSchema);
