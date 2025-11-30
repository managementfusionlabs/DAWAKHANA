import React, { useEffect, useState } from "react";
import axios from "axios";
import BottomNav from "../../components/ui/BottomNav";
import { useParams, useNavigate } from "react-router-dom";

export default function DeliveryOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get(`/orders/pharmacy/${id}`, { withCredentials: true })
      .then((res) => {
        if (!mounted) return;
        setOrder(res.data);
      })
      .catch((err) => {
        // Try alternate endpoint (customer or agent access)
        return axios.get(`/orders/${id}`, { withCredentials: true })
          .then(r2 => mounted && setOrder(r2.data))
          .catch(e => console.error(e));
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [id]);

  const updateStatus = async (newStatus) => {
    try {
      await axios.put(
        `/delivery/status/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      // refresh
      const res = await axios.get(`/orders/${id}`, { withCredentials: true });
      setOrder(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
          <h1 className="text-xl font-bold">Order Details</h1>
        </div>

        <div className="px-4 mt-4">
          <div className="bg-white p-6 rounded-xl shadow text-center">Loading...</div>
        </div>

        <BottomNav />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
          <h1 className="text-xl font-bold">Order Details</h1>
        </div>

        <div className="px-4 mt-4">
          <div className="bg-white p-6 rounded-xl shadow text-center">Order not found</div>
        </div>

        <BottomNav />
      </div>
    );
  }

  const orderCustomer = order.customer || order.customerDetails || {};

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold">Order Details</h1>
      </div>

      <div className="px-4 mt-4 flex flex-col gap-5">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="font-semibold text-gray-800 text-lg">Order: {order._id}</p>

          <div className="mt-3">
            <p className="text-gray-600">Customer: {orderCustomer.name || "-"}</p>
            <p className="text-gray-600">Phone: {orderCustomer.phone || "-"}</p>
            <p className="text-gray-600">Address: {order.address || "-"}</p>

            <span
              className={`px-3 py-1 mt-3 inline-block rounded-full text-xs font-semibold
                ${order.status === "delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}
              `}
            >
              {order.status}
            </span>
          </div>
        </div>

        <div className="bg-gray-200 rounded-xl h-48 flex items-center justify-center text-gray-600 text-sm">
          Map View (Coming Soon)
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Items</h2>

          <div className="flex flex-col gap-2">
            {(order.items || []).map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <p>{(item.medicine && item.medicine.name) || item.name || "Item"} (x{item.quantity})</p>
                <p className="font-semibold">₹{item.price}</p>
              </div>
            ))}
          </div>

          <div className="border-t mt-3 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>

        <div className="flex gap-3">
          {order.status !== "out_for_delivery" && (
            <button className="flex-1 py-3 bg-yellow-500 text-white rounded-lg shadow active:scale-95" onClick={() => updateStatus("out_for_delivery")}>
              Mark Out for Delivery
            </button>
          )}

          {order.status !== "delivered" && (
            <button className="flex-1 py-3 bg-green-600 text-white rounded-lg shadow active:scale-95" onClick={() => updateStatus("delivered")}>
              Mark Delivered
            </button>
          )}
        </div>

        <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg shadow active:scale-95" onClick={() => window.open(`tel:${orderCustomer.phone}`, "_self") }>
          Call Customer
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
