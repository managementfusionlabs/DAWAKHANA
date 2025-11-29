import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getAllMedicines, createMedicine} from "../controllers/medicineController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllMedicines);
router.post("/create", authMiddleware, createMedicine);
export default router;
