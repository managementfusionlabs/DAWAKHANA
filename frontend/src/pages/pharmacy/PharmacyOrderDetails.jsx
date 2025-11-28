// src/pages/pharmacy/PharmacyOrderDetails.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../components/layout/MainLayout";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import { useParams, useNavigate } from "react-router-dom";

export default function PharmacyOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/pharmacy/orders/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setOrder(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load order");
      });
  }, [id]);

  const updateStatus = async (status) => {
    try {
      setLoadingStatus(true);
      await axios.put(
        `/api/pharmacy/orders/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      // reload order
      const { data } = await axios.get(`/api/pharmacy/orders/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrder(data);
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setLoadingStatus(false);
    }
  };

  if (!order) return <MainLayout><p className="p-6">Loading...</p></MainLayout>;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      <GlassCard className="mb-6">
        <div className="flex justify-between">
          <div>
            <p className="text-xl font-semibold">Order: {order._id}</p>
            <p className="text-gray-300 mt-1">Customer: <span className="font-medium text-white">{order.customer?.name ?? "—"}</span></p>
            <p className="text-gray-300">Phone: {order.customer?.phone ?? "—"}</p>
            <p className="text-gray-300">Address: {order.address?.addressLine ?? "-"}</p>
          </div>

          <div>
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-700 text-white">
              {order.status}
            </span>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b">
              <th className="py-2">Medicine</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((it, i) => {
              const name = it.medicine?.name ?? it.medicineName ?? "—";
              const qty = it.quantity ?? it.qty ?? 1;
              const price = it.price ?? 0;
              return (
                <tr key={i} className="border-b">
                  <td className="py-3">{name}</td>
                  <td>{qty}</td>
                  <td>₹{price}</td>
                  <td className="font-semibold">₹{price * qty}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-end font-bold text-lg mt-4">
          Total: ₹{order.finalAmount ?? order.totalAmount ?? 0}
        </div>
      </GlassCard>

      <div className="flex gap-3">
        <Button onClick={() => updateStatus("processing")} disabled={loadingStatus}>
          {loadingStatus ? "..." : "Mark Processing"}
        </Button>
        <button
          onClick={() => updateStatus("ready_for_pickup")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow active:scale-95 transition"
        >
          Mark Ready
        </button>
        <button
          onClick={() => navigate("/pharmacy/orders")}
          className="px-6 py-3 bg-white/10 text-white border rounded-lg"
        >
          Back
        </button>
      </div>
    </MainLayout>
  );
}
