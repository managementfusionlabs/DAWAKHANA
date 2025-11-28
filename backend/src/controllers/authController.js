import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password, role, details } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      passwordHash,
      role,
      ...(role === "pharmacy" && { pharmacyDetails: details }),
      ...(role === "delivery" && { deliveryDetails: details }),
      ...(role === "customer" && { customerDetails: details }),
    });

    return res.json({
      message: "Registered successfully",
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    return res.json({
      message: "Login success",
      token: generateToken(user._id, user.role),
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
