import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    storeName: String,
    address: String,
    pincode: String,
    licenseNumber: String,
    gstNumber: String,
    isVerified: { type: Boolean, default: false },
    location: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pharmacy", pharmacySchema);
