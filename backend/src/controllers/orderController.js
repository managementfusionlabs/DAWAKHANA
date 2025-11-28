import Order from "../models/Order.js";
import User from "../models/User.js";

export const createOrder = async (req, res) => {
  try {
    const { pharmacyId, items, address } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ message: "No items in order" });

    let total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      customer: req.user.id,
      pharmacy: pharmacyId,
      items: items.map((i) => ({
        medicine: i.medicineId,
        quantity: i.quantity,
        price: i.price
      })),
      totalAmount: total,
      finalAmount: total,
      address,
      status: "pending"
    });

    res.json({
      message: "Order created",
      order
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};


export const getPharmacyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      pharmacy: req.user.id
    })
      .populate("customer")
      .populate("items.medicine");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const updateOrderStatusByPharmacy = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; // accepted / rejected

    const order = await Order.findOne({
      _id: orderId,
      pharmacy: req.user.id
    });

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    if (!["accepted", "rejected"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    order.status = status;
    await order.save();

    res.json({ message: "Updated", order });
  } catch (err) {
    res.status(500).json({ message: "Status update failed" });
  }
};

export const assignDeliveryAgent = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { agentId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.deliveryAgent = agentId;
    order.status = "assigned_to_agent";
    await order.save();

    res.json({ message: "Assigned", order });
  } catch (err) {
    res.status(500).json({ message: "Assignment failed" });
  }
};

export const deliveryUpdateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;

    const order = await Order.findOne({
      _id: orderId,
      deliveryAgent: req.user.id
    });

    if (!order)
      return res.status(404).json({ message: "Order not found or not assigned" });

    order.status = status;
    await order.save();

    res.json({ message: "Updated", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update delivery status" });
  }
};



export const pharmacyAssignAgent = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { agentId } = req.body;

    const order = await Order.findOne({
      _id: orderId,
      pharmacy: req.user.id
    });

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    order.deliveryAgent = agentId;
    order.status = "assigned_to_agent";

    await order.save();

    res.json({ message: "Agent assigned successfully", order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to assign agent" });
  }
};


export const agentAcceptOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { accept } = req.body; // true or false

    const order = await Order.findOne({
      _id: orderId,
      deliveryAgent: req.user.id
    });

    if (!order)
      return res.status(404).json({ message: "Order not assigned to you" });

    if (accept === true) {
      order.status = "ready_for_pickup";
    } else {
      // Agent rejects → unassign & return order to pharmacy stage
      order.deliveryAgent = null;
      order.status = "accepted";
    }

    await order.save();

    res.json({ message: "Agent response recorded", order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update agent response" });
  }
};


export const getAvailableAgents = async (req, res) => {
  try {
    const agents = await User.find({
      role: "delivery",
      "deliveryDetails.isAvailable": true
    }).select("name phone deliveryDetails");

    res.json(agents);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch agents" });
  }
};