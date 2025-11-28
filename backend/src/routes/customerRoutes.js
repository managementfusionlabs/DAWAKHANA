import express from "express";
import { listMedicines } from "../controllers/customerController.js";

const router = express.Router();

router.get("/medicines", listMedicines);

export default router;
