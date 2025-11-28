import Inventory from "../models/Inventory.js";

export const addInventory = async (req, res) => {
  try {
    const { medicineId, stock, price, expireDate } = req.body;

    const newItem = new Inventory({
      pharmacy: req.user.id,
      medicine: medicineId,
      stock,
      price,
      expireDate,
    });

    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to add item" });
  }
};

export const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find({ pharmacy: req.user.id })
      .populate("medicine");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
};

export const getInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findOne({
      _id: req.params.itemId,
      pharmacy: req.user.id,
    }).populate("medicine");

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch item" });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const updated = await Inventory.findOneAndUpdate(
      { _id: req.params.itemId, pharmacy: req.user.id },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update" });
  }
};

export const deleteInventory = async (req, res) => {
  try {
    await Inventory.findOneAndDelete({
      _id: req.params.itemId,
      pharmacy: req.user.id,
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete" });
  }
};
