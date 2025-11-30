import Order from "../models/Order.js";
import User from "../models/User.js";
import Inventory from "../models/Inventory.js"


// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { pharmacyId: pharmacyIdFromClient, items, address } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ message: "No items in order" });

    // compute total safely
    const total = items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);

    // Determine pharmacy:
    // Prefer client-provided pharmacyId. If missing, try to infer from Inventory for first item.
    let pharmacyId = pharmacyIdFromClient;

    if (!pharmacyId) {
      // try to infer by checking inventory record for the first medicine/inventoryId
      // item might contain medicineId or inventoryId depending on frontend
      const first = items[0];
      let inventoryRecord = null;

      if (first.inventoryId) {
        inventoryRecord = await Inventory.findById(first.inventoryId).lean();
      } else if (first.medicineId) {
        // find inventory entry that matches this medicine (and has stock) — best effort
        inventoryRecord = await Inventory.findOne({ medicine: first.medicineId }).lean();
      }

      if (inventoryRecord) pharmacyId = inventoryRecord.pharmacy?.toString();
    }

    if (!pharmacyId) {
      // If still not found, reject — it's important each order links to a pharmacy
      return res.status(400).json({ message: "pharmacyId missing and could not be inferred" });
    }

    // Build order items in the shape your Order model expects
    const orderItems = items.map((i) => ({
      medicine: i.medicineId || i.medicine, // tolerate multiple names
      quantity: Number(i.quantity) || Number(i.qty) || 1,
      price: Number(i.price) || 0,
    }));

    const order = await Order.create({
      customer: req.user.id,
      pharmacy: pharmacyId,
      items: orderItems,
      totalAmount: total,
      finalAmount: total,
      address,
      status: "pending",
    });

    res.json({
      message: "Order created",
      order,
    });
  } catch (err) {
    console.error("createOrder error:", err);
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

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


export const updateOrderStatusByPharmacy = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findOne({
      _id: orderId,
      pharmacy: req.user.id
    });

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    const validStatuses = [
      "pending",
      "accepted",
      "processing",
      "ready_for_pickup",
      "assigned_to_agent",
      "out_for_delivery",
      "delivered",
      "rejected"
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Status update failed" });
  }
};


// GET /api/order/queue
// Returns orders ready_for_pickup and not yet assigned for the currently-logged-in pharmacy
export const getQueue = async (req, res) => {
  try {
    // ensure this route is used by pharmacy role (roleMiddleware will enforce)
    const pharmacyId = req.user.id;

    const orders = await Order.find({
      pharmacy: pharmacyId,
      status: "ready_for_pickup",
      $or: [{ deliveryAgent: { $exists: false } }, { deliveryAgent: null }],
    })
      .populate("customer")
      .populate("items.medicine")
      .sort({ createdAt: -1 });

    // always return an array (empty if none)
    return res.json(orders);
  } catch (err) {
    console.error("[order] getQueue error:", err);
    return res.status(500).json({ message: "Failed to fetch queue" });
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