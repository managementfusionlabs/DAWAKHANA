// src/pages/pharmacy/PharmacyOrders.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../components/layout/MainLayout";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function PharmacyOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/pharmacy/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <GlassCard>
        <div className="flex gap-3 mb-4">
          {["All", "pending", "accepted", "processing", "ready_for_pickup", "out_for_delivery", "delivered"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg border ${
                filter === f ? "bg-blue-600 text-white" : "bg-white text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((o) => (
                <tr key={o._id} className="border-b">
                  <td className="py-3">{o._id}</td>
                  <td>{o.customer?.name ?? "Anonymous"}</td>
                  <td>₹{o.finalAmount ?? o.totalAmount ?? o.totalAmount}</td>
                  <td>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold">
                      {o.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => navigate(`/pharmacy/orders/${o._id}`)} className="text-blue-600">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && <p className="text-center py-6 text-gray-500">No orders found.</p>}
        </div>
      </GlassCard>
    </MainLayout>
  );
}
