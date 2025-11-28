import Pharmacy from "../models/Pharmacy.js";
import Inventory from "../models/Inventory.js";

export const createPharmacy = async (req, res) => {
  try {
    const { storeName, address, pincode, licenseNumber, gstNumber } = req.body;

    const ph = await Pharmacy.create({
      owner: req.user.id,
      storeName,
      address,
      pincode,
      licenseNumber,
      gstNumber
    });

    res.json({ message: "Pharmacy created", pharmacy: ph });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addInventory = async (req, res) => {
  try {
    const { medicineId, stock, price, expireDate } = req.body;

    const inv = await Inventory.create({
      pharmacy: req.user.pharmacyId,
      medicine: medicineId,
      stock,
      price,
      expireDate
    });

    res.json({ message: "Inventory added", inventory: inv });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyInventory = async (req, res) => {
  try {
    const items = await Inventory.find({
      pharmacy: req.user.pharmacyId
    }).populate("medicine");

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
