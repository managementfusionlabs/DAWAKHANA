import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import PharmacySidebar from "../../components/layout/PharmacySidebar";
import MainLayout from "../../components/layout/MainLayout";
export default function AssignAgentList() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get("./order/queue", { withCredentials: true })
      .then((res) => {
        if (!mounted) return;
        setQueue(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch queue:", err);
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  return (
 <MainLayout>
    <div className="flex gap-6">
 

      <div className="flex-1">

        <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
          <h1 className="text-xl font-bold">Assign Agent — Queue</h1>
        </div>

        <div className="px-4 mt-4">
          {loading ? (
            <div className="bg-white p-6 rounded-xl shadow text-center">Loading...</div>
          ) : queue.length ? (
            <div className="flex flex-col gap-3">
              {queue.map((order) => (
                <div key={order._id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Order: {order._id}</p>
                    <p className="text-sm text-gray-500">
                      {order.customer?.name} • {order.address?.addressLine || order.address?.city}
                    </p>
                    <p className="text-sm text-gray-500">₹{order.totalAmount}</p>
                  </div>

                  <button
                    className="text-blue-600 text-sm"
                    onClick={() => navigate(`/pharmacy/assign-agent/${order._id}`)}
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow text-center">No orders in queue</div>
          )}
        </div>

      </div>
    </div>
  </MainLayout>
  );
}
