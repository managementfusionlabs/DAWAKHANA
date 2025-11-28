import Medicine from "../models/Medicine.js";

export const getAllMedicines = async (req, res) => {
  try {
    const meds = await Medicine.find().lean();
    res.json(meds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch medicines" });
  }
};
