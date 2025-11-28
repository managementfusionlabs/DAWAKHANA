import Order from "../models/Order.js";

export const getPharmacyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ pharmacy: req.user.id })
      .populate("customer")
      .populate("items.medicine");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getSinglePharmacyOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      pharmacy: req.user.id,
    })
      .populate("customer")
      .populate("items.medicine");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

export const updatePharmacyOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, pharmacy: req.user.id },
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};
