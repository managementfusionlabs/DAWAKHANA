// routes/deliveryRoutes.js
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import Order from "../models/Order.js";
import { deliveryUpdateStatus } from "../controllers/orderController.js"; // uses your existing safe function
import { toggleAvailability } from "../controllers/deliveryController.js";

const router = express.Router();
router.use(authMiddleware);


// GET /api/delivery/me
// Get logged-in delivery agent's profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    console.log("access attempt by user:",req.user.role,req.user.id);
    if (req.user.role !== "delivery") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await User.findById(req.user.id).select("-passwordHash");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
});


// GET /api/delivery/my-deliveries
// Get all orders assigned to the logged-in delivery agent
router.get(
  "/my-deliveries",
  authMiddleware,
  roleMiddleware("delivery"),
  async (req, res) => {
    try {
      console.log("[delivery] GET /my-deliveries for agent:", req.user?.id);
      const orders = await Order.find({ deliveryAgent: req.user.id })
        .populate("customer")
        .populate("items.medicine")
        .sort({ createdAt: -1 });

      // ALWAYS return an array (empty if none)
      return res.json(orders);
    } catch (err) {
      console.error("[delivery] failed to fetch deliveries:", err);
      return res.status(500).json({ message: "Failed to fetch deliveries" });
    }
  }
);

// PUT /api/delivery/status/:orderId
// Agent updates status (deliveryUpdateStatus checks deliveryAgent ownership)
router.put(
  "/status/:orderId",
  authMiddleware,
  roleMiddleware("delivery"),
  deliveryUpdateStatus
);

// PUT /api/delivery/availability
// Toggle or set availability for the delivery agent (body: { isAvailable: true/false })
router.put(
  "/availability",
  authMiddleware,
  roleMiddleware("delivery"),
  toggleAvailability
);

export default router;
