import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
  getPharmacyOrders,
  getSinglePharmacyOrder,
  updatePharmacyOrderStatus,
} from "../controllers/pharmacyOrderController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/orders", getPharmacyOrders);
router.get("/orders/:id", getSinglePharmacyOrder);
router.put("/orders/:id/status", updatePharmacyOrderStatus);

export default router;
