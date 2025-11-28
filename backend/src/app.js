import express from "express";
import cors from "cors";

import inventoryRoutes from "./routes/inventoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pharmacyRoutes from "./routes/pharmacyRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/customer", customerRoutes);
export default app;
