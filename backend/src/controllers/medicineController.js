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

export const createMedicine = async (req, res) => {
  try {
    console.log("Creating medicine with data:", req.body);
    const med = new Medicine({
      ...req.body,
      pharmacy: req.user.id, // pharmacy ID from JWT
    });

    await med.save();
    res.json(med);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create medicine" });
  }
};
