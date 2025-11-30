import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";
import {getAllMedicines,getMedicinesByPharmacy,searchMedicines,} from "../controllers/customerController.js";

const router = express.Router();
router.use(authMiddleware);

// GET /api/delivery/me
// Get logged-in delivery agent's profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    
    if (req.user.role !== "customer") {
    
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await User.findById(req.user.id).select("-passwordHash");
    res.json(user);
  } catch (err) {
      
    res.status(500).json({ error: "Server error" });
  }
});


// GET /api/customer/medicines
router.get("/medicines", getAllMedicines);

// GET /api/customer/pharmacy/:pharmacyId
router.get("/pharmacy/:pharmacyId", getMedicinesByPharmacy);

// GET /api/customer/search
router.get("/search", searchMedicines);


export default router;
