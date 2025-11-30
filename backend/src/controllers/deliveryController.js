// controllers/deliveryController.js
import User from "../models/User.js";

/**
 * Toggle or set delivery availability.
 * Body: { isAvailable: true } or { isAvailable: false }
 */
export const toggleAvailability = async (req, res) => {
  try {
    const { isAvailable } = req.body;
    const userId = req.user.id;

    if (typeof isAvailable !== "boolean") {
      return res.status(400).json({ message: "isAvailable must be boolean" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.deliveryDetails = {
      ...(user.deliveryDetails || {}),
      isAvailable,
    };

    await user.save();

    console.log(`[delivery] user ${userId} availability set to`, isAvailable);

    return res.json({ message: "Availability updated", deliveryDetails: user.deliveryDetails });
  } catch (err) {
    console.error("[delivery] toggleAvailability error:", err);
    return res.status(500).json({ message: "Failed to update availability" });
  }
};
