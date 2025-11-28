import Inventory from "../models/Inventory.js";
import Medicine from "../models/Medicine.js";

export const getAllMedicines = async (req, res) => {
  try {
    const data = await Inventory.find()
      .populate("medicine")
      .populate("pharmacy");

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch medicines" });
  }
};

export const getMedicinesByPharmacy = async (req, res) => {
  try {
    const { pharmacyId } = req.params;

    const items = await Inventory.find({ pharmacy: pharmacyId }).populate(
      "medicine"
    );

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pharmacy medicines" });
  }
};

export const searchMedicines = async (req, res) => {
  try {
    const { query } = req.query;

    const meds = await Medicine.find({
      name: { $regex: query, $options: "i" }
    });

    res.json(meds);
  } catch (err) {
    res.status(500).json({ message: "Failed to search medicines" });
  }
};
