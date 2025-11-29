import express from "express";
import cors from "cors";
// Importing models to ensure they are registered with Mongoose
import "./models/Pharmacy.js";
import "./models/Inventory.js"; 
import "./models/Medicine.js";

// Importing route handlers
import inventoryRoutes from "./routes/inventoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pharmacyRoutes from "./routes/pharmacyRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Setting up routes
app.use("/api/auth", authRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/pharmacy/medicines", medicineRoutes);



export default app;
