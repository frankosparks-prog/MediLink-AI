// routes/medicationRoutes.js
import express from "express";
import Medication from "../models/Medication.js";
import MedicationOrder from "../models/MedicationOrder.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * 📌 Get all medications (with search & category filter)
 */
router.get("/", async (req, res) => {
  try {
    const { search = "", category = "All" } = req.query;
    let query = {};

    if (search.trim()) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category !== "All") {
      query.category = category;
    }

    const medications = await Medication.find(query).sort({ name: 1 }).lean();
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching medications", error: error.message });
  }
});

/**
 * 📌 Place medication order
 */
router.post("/order", verifyToken, async (req, res) => {
  try {
    const { items, deliveryAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    // Get all medication IDs from request
    const medicationIds = items.map(i => i.medicationId);

    // Fetch all medications in one query
    const meds = await Medication.find({ _id: { $in: medicationIds } });

    if (meds.length !== items.length) {
      return res.status(404).json({ message: "Some medications not found" });
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const med = meds.find(m => m._id.toString() === item.medicationId);

      // Validate stock
      if (item.quantity > med.stock) {
        return res.status(400).json({
          message: `Not enough stock for ${med.name}. Available: ${med.stock}`
        });
      }

      // Add item to order list
      orderItems.push({
        medication: med._id,
        quantity: item.quantity,
        price: med.price,
      });

      totalPrice += med.price * item.quantity;

      // Deduct stock
      med.stock -= item.quantity;
      await med.save();
    }

    // Create new order
    const newOrder = new MedicationOrder({
      patient: req.user.id,
      items: orderItems,
      totalPrice,
      deliveryAddress,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
});

/**
 * 📌 Get logged-in patient's orders
 */
router.get("/my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await MedicationOrder.find({ patient: req.user.id })
      .populate("items.medication", "name price description category image")
      .sort({ createdAt: -1 })
      .lean();

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

export default router;
