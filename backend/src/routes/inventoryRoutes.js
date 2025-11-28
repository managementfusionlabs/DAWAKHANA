import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

import {
  addInventory,
  getInventory,
  getInventoryItem,
  updateInventory,
  deleteInventory,
} from "../controllers/inventoryController.js";

const router = express.Router();

// Pharmacy only
router.use(authMiddleware, roleMiddleware("pharmacy"));

// Add inventory item
router.post("/add", addInventory);

// List all inventory items of this pharmacy
router.get("/list", getInventory);

// Get single inventory item
router.get("/item/:itemId", getInventoryItem);

// Update
router.put("/update/:itemId", updateInventory);

// Delete
router.delete("/delete/:itemId", deleteInventory);

export default router;
