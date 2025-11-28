import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  addressLine: String,
  city: String,
  state: String,
  pincode: String,
  landmark: String,
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },

    role: {
      type: String,
      enum: ["customer", "pharmacy", "delivery", "admin"],
      required: true,
    },

    // Customer fields
    customerDetails: {
      addresses: [addressSchema],
    },

    // Pharmacy fields
    pharmacyDetails: {
      storeName: String,
      address: String,
      licenseNumber: String,
      gstNumber: String,
      isVerified: { type: Boolean, default: false },
    },

    // Delivery boy fields
    deliveryDetails: {
      vehicleType: String,
      vehicleNumber: String,
      isAvailable: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
