import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Inventory Controllers
import {
  addInventory,
  getInventory,
  updateInventory,
  deleteInventory,
} from "../controllers/inventoryController.js";

// Medicine Controller (you must add this controller file)
import { getAllMedicines } from "../controllers/medicineController.js";

// Order Controllers (you need these defined)
import {
  getPharmacyOrders,
  getSinglePharmacyOrder,
  updatePharmacyOrderStatus,
} from "../controllers/pharmacyOrderController.js";

const router = express.Router();

/* ===========================
    MEDICINES (MASTER LIST)
   ===========================*/

// GET all medicines (master list for dropdown)
router.get("/medicines", authMiddleware, getAllMedicines);

/* ===========================
        INVENTORY
   ===========================*/

// GET inventory for logged-in pharmacy
router.get("/inventory", authMiddleware, getInventory);

// ADD inventory item
router.post("/inventory", authMiddleware, addInventory);

// GET single inventory item
router.get("/inventory/:itemId", authMiddleware, getInventory); // you may create getSingleInventory if needed

// UPDATE inventory item
router.put("/inventory/:itemId", authMiddleware, updateInventory);

// DELETE inventory item
router.delete("/inventory/:itemId", authMiddleware, deleteInventory);

/* ===========================
          ORDERS
   ===========================*/

// GET all orders for the pharmacy
router.get("/orders", authMiddleware, getPharmacyOrders);

// GET single order
router.get("/orders/:id", authMiddleware, getSinglePharmacyOrder);

// UPDATE order status (packed / ready / processing)
router.put("/orders/:id/status", authMiddleware, updatePharmacyOrderStatus);

export default router;
