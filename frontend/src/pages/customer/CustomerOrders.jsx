import { useEffect, useState } from "react";
import BottomNav from "../../components/ui/BottomNav";
import axios from "axios";

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/api/order/my-orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold">My Orders</h1>
      </div>

      <div className="px-4 mt-4 flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">Order #{order._id.slice(-6)}</p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <span className="text-xs px-3 py-1 rounded-full mt-2 inline-block bg-blue-100 text-blue-700">
                {order.status}
              </span>
            </div>

            <div className="text-right">
              <p className="font-bold">₹{order.finalAmount}</p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
