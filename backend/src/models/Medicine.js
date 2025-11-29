import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    medCode: {
      type: String,
      required: true,
      unique: true,
    },

    name: { type: String, required: true },
    genericName: String,
    brand: String,
    description: String,
    category: String,

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
      required: true,
    },

    requiresPrescription: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ⭐ FIXED pre-hook (no next argument, no arrow functions)
medicineSchema.pre("validate", async function () {
  if (!this.medCode) {
    const count = await mongoose.models.Medicine.countDocuments({
      pharmacy: this.pharmacy,
    });

    this.medCode = `MED-${String(count + 1).padStart(4, "0")}`;
  }
});

export default mongoose.model("Medicine", medicineSchema);
