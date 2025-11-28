import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true },
    passwordHash: { type: String, required: true },

    role: {
      type: String,
      enum: ["customer", "pharmacy", "delivery", "admin"],
      required: true,
    },

    // Role-specific expansions
    pharmacyDetails: {
      storeName: String,
      address: String,
      licenseNumber: String,
      isVerified: { type: Boolean, default: false },
    },

    deliveryDetails: {
      vehicleType: String,
      isAvailable: { type: Boolean, default: true },
    },

    customerDetails: {
      addresses: [
        {
          addressLine: String,
          pincode: String,
          city: String,
          state: String,
          landmark: String,
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
