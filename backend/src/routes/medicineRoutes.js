import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getAllMedicines } from "../controllers/medicineController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllMedicines);

export default router;
