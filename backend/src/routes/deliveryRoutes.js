import express from "express";
import { updateStatus } from "../controllers/deliveryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.put(
  "/status/:orderId",
  authMiddleware,
  roleMiddleware("delivery"),
  updateStatus
);

export default router;
