import express from "express";
import {
  createPharmacy,
  addInventory,
  getMyInventory
} from "../controllers/pharmacyController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  roleMiddleware("pharmacy"),
  createPharmacy
);

router.post(
  "/inventory/add",
  authMiddleware,
  roleMiddleware("pharmacy"),
  addInventory
);

router.get(
  "/inventory",
  authMiddleware,
  roleMiddleware("pharmacy"),
  getMyInventory
);

export default router;
