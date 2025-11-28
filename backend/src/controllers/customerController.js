import Inventory from "../models/Inventory.js";

export const listMedicines = async (req, res) => {
  try {
    const medicines = await Inventory.find().populate("medicine pharmacy");
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
