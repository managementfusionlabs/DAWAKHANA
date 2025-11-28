// src/pages/pharmacy/PharmacyDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../components/layout/MainLayout";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function PharmacyDashboard() {
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenHeader = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    // Get orders
    axios.get("/api/pharmacy/orders", tokenHeader)
      .then((r) => {
        if (Array.isArray(r.data)) setOrders(r.data);
        else if (Array.isArray(r.data.orders)) setOrders(r.data.orders);
        else setOrders([]);
      })
      .catch(() => setOrders([]));

    // Get inventory
    axios.get("/api/inventory", tokenHeader)
      .then((r) => setInventory(Array.isArray(r.data) ? r.data : []))
      .catch(() => setInventory([]));

  }, []);

  /* ---------------------------------
      DASHBOARD CALCULATED VALUES
     ---------------------------------*/

  const pending = orders.filter((o) => o.status === "pending").length;

  const completedToday = orders.filter((o) => {
    if (!o.updatedAt) return false;
    const updated = new Date(o.updatedAt).toDateString();
    const today = new Date().toDateString();
    return updated === today && o.status === "delivered";
  }).length;

  const lowStock = inventory.filter((i) => i.stock < 10).length;

  const latestOrders = orders.slice(0, 5);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Pharmacy Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">

        <GlassCard className="p-6">
          <p className="text-lg">Pending Orders</p>
          <p className="text-3xl font-bold mt-2">{pending}</p>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-lg">Completed Today</p>
          <p className="text-3xl font-bold mt-2">{completedToday}</p>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-lg">Low Stock Items</p>
          <p className="text-3xl font-bold mt-2">{lowStock}</p>
        </GlassCard>

      </div>

      <GlassCard className="mb-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Latest Orders</h2>
          <Button onClick={() => navigate("/pharmacy/orders")}>View All</Button>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2">Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {latestOrders.map((o) => (
              <tr key={o._id} className="border-b">
                <td className="py-3">{o._id}</td>
                <td>{o.customer?.name ?? "—"}</td>
                <td>₹{o.finalAmount ?? o.totalAmount ?? 0}</td>
                <td>{o.status}</td>
                <td>
                  <button
                    onClick={() => navigate(`/pharmacy/orders/${o._id}`)}
                    className="text-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {latestOrders.length === 0 && (
          <p className="text-center py-6 text-gray-500">No recent orders.</p>
        )}

      </GlassCard>
    </MainLayout>
  );
}
