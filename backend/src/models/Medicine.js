import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    genericName: String,
    brand: String,
    description: String,

    category: String,

    // ⭐ NEW FIELD — for your dropdown
    form: {
      type: String,
      enum: [
        "Tablet",
        "Capsule",
        "Syrup",
        "Suspension",
        "Injection",
        "Drops",
        "Gel",
        "Ointment",
        "Cream",
        "Spray",
        "Lotion",
        "Inhaler",
      ],
      required: false,
    },

    requiresPrescription: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Medicine", medicineSchema);
