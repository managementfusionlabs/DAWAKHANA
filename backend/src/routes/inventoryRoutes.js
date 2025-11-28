import express from "express";
import {
  addInventory,
  getInventory,
  updateInventory,
  deleteInventory
} from "../controllers/inventoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  roleMiddleware("pharmacy"),
  addInventory
);

router.get(
  "/list",
  authMiddleware,
  roleMiddleware("pharmacy"),
  getInventory
);

router.put(
  "/update/:itemId",
  authMiddleware,
  roleMiddleware("pharmacy"),
  updateInventory
);

router.delete(
  "/delete/:itemId",
  authMiddleware,
  roleMiddleware("pharmacy"),
  deleteInventory
);

export default router;
