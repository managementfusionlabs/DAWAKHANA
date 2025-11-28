import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { pharmacyId, items, address } = req.body;

    let total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

    const order = await Order.create({
      customer: req.user.id,
      pharmacy: pharmacyId,
      items: items.map((i) => ({
        medicine: i.medicineId,
        quantity: i.qty,
        price: i.price
      })),
      totalAmount: total,
      finalAmount: total,
      address
    });

    res.json({ message: "Order placed", order });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
