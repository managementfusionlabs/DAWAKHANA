import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {getPharmacyOrders,getSinglePharmacyOrder,updatePharmacyOrderStatus,} from "../controllers/pharmacyOrderController.js";

// Pharmacy Routes
const router = express.Router();
router.use(authMiddleware);

// GET /api/pharmacy/me
// Get logged-in pharmacy's profile
router.get("/me", authMiddleware, async (req, res) => {
  if (req.user.role !== "pharmacy") {
    return res.status(403).json({ error: "Access denied" });
  }

  const user = await User.findById(req.user.id).select("-passwordHash");
  res.json(user);
});


// GET /api/pharmacy/orders
router.get("/orders", getPharmacyOrders);

// GET /api/pharmacy/orders/:id
router.get("/orders/:id", getSinglePharmacyOrder);

// PUT /api/pharmacy/orders/:id/status
router.put("/orders/:id/status", updatePharmacyOrderStatus);



export default router;
