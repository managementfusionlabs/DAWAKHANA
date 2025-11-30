import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import BottomNav from "../../components/ui/BottomNav";
import PharmacySidebar from "../../components/layout/PharmacySidebar";
import MainLayout from "../../components/layout/MainLayout";
export default function AssignAgentDetails() {
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    // fetch order details (pharmacy-only endpoint exists)
    const p1 = axios.get(`/order/pharmacy/${orderId}`, { withCredentials: true });
    // fetch available agents
    const p2 = axios.get("/order/agents", { withCredentials: true });

    Promise.all([p1, p2])
      .then(([r1, r2]) => {
        if (!mounted) return;
        setOrder(r1.data);
        setAgents(r2.data || []);
      })
      .catch((err) => {
        console.error("Failed to load assign page:", err);
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [orderId]);

  const assignAgent = async (agentId) => {
    setAssigning(true);
    try {
      await axios.put(
        `/order/pharmacy/assign/${orderId}`,
        { agentId },
        { withCredentials: true }
      );

      // success — redirect to orders or queue
      navigate("/pharmacy/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to assign agent");
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
          <h1 className="text-xl font-bold">Assign Agent</h1>
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
          <h1 className="text-xl font-bold">Assign Agent</h1>
        </div>

        <div className="px-4 mt-4">
          <div className="bg-white p-6 rounded-xl shadow text-center">Order not found</div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
<MainLayout>
 
    <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
      <h1 className="text-xl font-bold">Assign Agent</h1>
    </div>

    <div className="px-4 mt-4 flex flex-col gap-4">
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="font-semibold">Order: {order._id}</p>
        <p className="text-sm text-gray-500">
          {order.customer?.name} • {order.address?.addressLine}
        </p>
        <p className="font-bold mt-2">₹{order.totalAmount}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Available Agents</h2>

        {agents.length ? (
          <div className="flex flex-col gap-3">
            {agents.map((a) => (
              <div key={a._id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{a.name}</p>
                  <p className="text-sm text-gray-500">{a.phone}</p>
                </div>

                <button
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg"
                  disabled={assigning}
                  onClick={() => assignAgent(a._id)}
                >
                  Assign
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500">No available agents</div>
        )}
      </div>
    </div>

  </MainLayout>
  );
}
