const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String }, // optional medication image
    stock: { type: Number, default: 0 }, // inventory
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medication", medicationSchema);
