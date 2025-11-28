import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
  quantity: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: "Pharmacy" },
    items: [orderItemSchema],
    
    deliveryAgent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "processing",
        "ready_for_pickup",
        "assigned_to_agent",
        "out_for_delivery",
        "delivered",
        "rejected",
        "cancelled",
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    totalAmount: Number,
    deliveryFee: Number,
    finalAmount: Number,

    address: {
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
