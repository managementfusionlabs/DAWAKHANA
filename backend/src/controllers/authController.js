import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, phone, email, password, role, details } = req.body;

    const exists = await User.findOne({ phone });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      email,
      passwordHash,
      role,
      ...(role === "customer" && { customerDetails: details }),
      ...(role === "pharmacy" && { pharmacyDetails: details }),
      ...(role === "delivery" && { deliveryDetails: details }),
    });

    return res.json({
      message: "Registered successfully",
      token: generateToken(user._id, role),
      role,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal error" });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    return res.json({
      message: "Login success",
      token: generateToken(user._id, user.role),
      role: user.role,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal error" });
  }
};
