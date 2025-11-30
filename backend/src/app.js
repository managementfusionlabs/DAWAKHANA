import express from "express";
import cors from "cors";
import "./models/Pharmacy.js";
import "./models/Inventory.js";
import "./models/Medicine.js";
import "./models/Order.js";
import "./models/User.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pharmacyRoutes from "./routes/pharmacyRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/pharmacy/medicines", medicineRoutes);

export default app;