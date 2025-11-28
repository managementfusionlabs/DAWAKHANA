import express from "express";
import {
  getAllMedicines,
  getMedicinesByPharmacy,
  searchMedicines,
} from "../controllers/customerController.js";

const router = express.Router();

router.get("/medicines", getAllMedicines);

router.get("/pharmacy/:pharmacyId", getMedicinesByPharmacy);

router.get("/search", searchMedicines);


export default router;
