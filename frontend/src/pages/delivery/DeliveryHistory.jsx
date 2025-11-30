import React, { useEffect, useState } from "react";
import axios from "axios";
import BottomNav from "../../components/ui/BottomNav";
import { useNavigate } from "react-router-dom";

export default function DeliveryHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get("/delivery/my-deliveries", { withCredentials: true })
      .then((res) => {
        if (!mounted) return;
        const delivered = (res.data || []).filter((o) => o.status === "delivered");
        setHistory(delivered);
      })
      .catch((err) => console.error(err))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold">Delivery History</h1>
      </div>

      <div className="px-4 mt-4 flex flex-col gap-4">
        {loading ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">Loading...</div>
        ) : history.length ? (
          history.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-700">Order: {order._id}</p>
                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>

                <span className="px-3 py-1 mt-2 inline-block rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  Delivered
                </span>
              </div>

              <div className="text-right">
                <p className="font-bold text-gray-700">₹{order.totalAmount}</p>
                <button className="text-blue-600 text-sm mt-2" onClick={() => navigate(`/delivery/order/${order._id}`)}>
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-xl shadow text-center">No deliveries yet</div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
