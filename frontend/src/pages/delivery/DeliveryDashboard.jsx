import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/ui/BottomNav";

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get("/delivery/my-deliveries", { withCredentials: true })
      .then((res) => {
        if (!mounted) return;
        setOrders(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch deliveries:", err);
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const activeOrder = orders.find((o) => o.status !== "delivered");

  const markDelivered = async (orderId) => {
    try {
      await axios.put(
        `/delivery/status/${orderId}`,
        { status: "delivered" },
        { withCredentials: true }
      );

      // pessimistic refresh
      const res = await axios.get("/delivery/my-deliveries", { withCredentials: true });
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to mark delivered");
    }
  };

  const markOutForDelivery = async (orderId) => {
    try {
      await axios.put(
        `/delivery/status/${orderId}`,
        { status: "out_for_delivery" },
        { withCredentials: true }
      );
      const res = await axios.get("/delivery/my-deliveries", { withCredentials: true });
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold">Delivery Dashboard</h1>
      </div>

      <div className="px-4 mt-4">
        <h2 className="text-lg font-semibold mb-2">Active Delivery</h2>

        {loading ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">Loading...</div>
        ) : activeOrder ? (
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Order: {activeOrder._id}</h3>
                <p className="text-sm text-gray-500">{activeOrder.address?.addressLine ||activeOrder.address?.city || activeOrder.address?.pincode}</p>
                <p className="text-sm text-gray-500">Customer: {activeOrder.customer?.name}</p>
              </div>

              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold h-fit">
                {activeOrder.status}
              </span>
            </div>

            <p className="font-bold mt-3 text-gray-700">₹{activeOrder.totalAmount}</p>

            <div className="mt-4 flex gap-3">
              <button
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg shadow active:scale-95"
                onClick={() => navigate(`/delivery/order/${activeOrder._id}`)}
              >
                View
              </button>

              {activeOrder.status !== "out_for_delivery" && (
                <button
                  className="flex-1 py-3 bg-yellow-500 text-white rounded-lg shadow active:scale-95"
                  onClick={() => markOutForDelivery(activeOrder._id)}
                >
                  Out for delivery
                </button>
              )}

              <button
                className="flex-1 py-3 bg-green-600 text-white rounded-lg shadow active:scale-95"
                onClick={() => markDelivered(activeOrder._id)}
              >
                Mark Delivered
              </button>
            </div>

            <button
              className="w-full mt-3 py-3 bg-gray-100 text-gray-700 rounded-lg shadow active:scale-95"
              onClick={() => window.open(`tel:${activeOrder.customer?.phone}`, "_self")}
            >
              Call Customer
            </button>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            No active deliveries
          </div>
        )}
      </div>

      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold mb-2">Pending / Assigned</h2>

        <div className="flex flex-col gap-3">
          {orders.filter(o => o.status !== 'delivered').map((o) => (
            <div key={o._id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">{o._id}</p>
                <p className="text-sm text-gray-500">{o.customer?.name} • {o.address?.addressLine || o.address?.city || o.address?.pincode}</p>
              </div>

              <div className="text-right">
                <p className="font-bold">₹{o.totalAmount}</p>
                <button className="text-blue-600 text-sm mt-2" onClick={() => navigate(`/delivery/order/${o._id}`)}>
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
