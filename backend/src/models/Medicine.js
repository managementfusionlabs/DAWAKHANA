import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    genericName: String,
    brand: String,
    description: String,
    category: String,
    requiresPrescription: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Medicine", medicineSchema);
