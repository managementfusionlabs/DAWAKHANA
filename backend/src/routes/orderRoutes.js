import express from "express";
import {
  createOrder,
  getPharmacyOrders,
  updateOrderStatusByPharmacy,
   getAvailableAgents,
   pharmacyAssignAgent,
   getMyOrders
} from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import Order from "../models/Order.js";


const router = express.Router();

// Customer
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("customer"),
  createOrder
);
router.get(
  "/my-orders",
  authMiddleware,
  roleMiddleware("customer"),
  getMyOrders
);

// Pharmacy
router.get(
  "/pharmacy",
  authMiddleware,
  roleMiddleware("pharmacy"),
  getPharmacyOrders
);


// Get a single order for pharmacy
router.get(
  "/pharmacy/:orderId",
  authMiddleware,
  roleMiddleware("pharmacy"),
  async (req, res) => {
    try {
      const order = await Order.findOne({
        _id: req.params.orderId,
        pharmacy: req.user.id, // ensures a pharmacy can load only its own orders
      })
        .populate("customer")
        .populate("items.medicine");

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json(order);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  }
);



router.put(
  "/pharmacy/status/:orderId",
  authMiddleware,
  roleMiddleware("pharmacy"),
  updateOrderStatusByPharmacy
);

// Admin assigns agent
router.get(
  "/agents",
  authMiddleware,
  roleMiddleware("pharmacy"),
  getAvailableAgents
);

router.put(
  "/pharmacy/assign/:orderId",
  authMiddleware,
  roleMiddleware("pharmacy"),
  pharmacyAssignAgent
);

// router.put(
//   "/agent/accept/:orderId",
//   authMiddleware,
//   roleMiddleware("delivery"),
//   agentAcceptOrder
// );
// router.put(
//   "/assign/:orderId",
//   authMiddleware,
//   roleMiddleware("admin"),
//   assignDeliveryAgent
// );

// // Delivery Agent updates
// router.put(
//   "/delivery/update/:orderId",
//   authMiddleware,
//   roleMiddleware("delivery"),
//   deliveryUpdateStatus
// );

export default router;
