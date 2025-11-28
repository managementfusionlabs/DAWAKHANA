import Inventory from "../models/Inventory.js";

export const addInventory = async (req, res) => {
  try {
    const { medicineId, stock, price, expireDate } = req.body;

    const pharmacyId = req.user.id; // owner is user

    const item = await Inventory.create({
      pharmacy: pharmacyId,
      medicine: medicineId,
      stock,
      price,
      expireDate
    });

    res.json({ message: "Inventory item added", item });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add inventory" });
  }
};

export const getInventory = async (req, res) => {
  try {
    const pharmacyId = req.user.id;

    const items = await Inventory.find({ pharmacy: pharmacyId }).populate(
      "medicine"
    );

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { stock, price, expireDate } = req.body;

    const item = await Inventory.findOneAndUpdate(
      { _id: itemId, pharmacy: req.user.id },
      { stock, price, expireDate },
      { new: true }
    );

    if (!item)
      return res.status(404).json({ message: "Inventory item not found" });

    res.json({ message: "Updated", item });
  } catch (err) {
    res.status(500).json({ message: "Failed to update inventory" });
  }
};

export const deleteInventory = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await Inventory.findOneAndDelete({
      _id: itemId,
      pharmacy: req.user.id
    });

    if (!item)
      return res.status(404).json({ message: "Item not found or not yours" });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item" });
  }
};
