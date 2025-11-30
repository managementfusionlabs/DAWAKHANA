import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import BottomNav from "../../components/ui/BottomNav";

export default function DeliveryProfile() {
  const [rider, setRider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get("/delivery/me", { withCredentials: true })
      .then((res) => {
        if (!mounted) return;
        setRider(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const toggleAvailability = async () => {
    if (!rider) return;
    setToggling(true);
    try {
      const newVal = !rider.deliveryDetails?.isAvailable;
      await axios.put(
        "/delivery/availability",
        { isAvailable: newVal },
        { withCredentials: true }
      );

      setRider((prev) => ({
        ...prev,
        deliveryDetails: { ...(prev.deliveryDetails || {}), isAvailable: newVal },
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to toggle availability");
    } finally {
      setToggling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
          <h1 className="text-xl font-bold">Profile</h1>
        </div>

        <div className="px-4 mt-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">Loading...</div>
        </div>

        <BottomNav />
      </div>
    );
  }

  const name = rider?.name || "Rider";
  const email = rider?.email || "-";
  const phone = rider?.phone || "-";
  const isAvailable = rider?.deliveryDetails?.isAvailable || false;
  const completed = rider?.deliveryDetails?.completedDeliveries || 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold">Profile</h1>
      </div>

      <div className="px-4 mt-6">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <div className="w-20 h-20 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold">
            {name[0]}
          </div>

          <h2 className="text-xl font-semibold mt-4">{name}</h2>
          <p className="text-gray-500 text-sm">{email}</p>
          <p className="text-gray-500">{phone}</p>

          <p className="text-sm mt-2 text-gray-400">Completed Deliveries: {completed}</p>
        </div>
      </div>

      <div className="px-4 mt-6 flex flex-col gap-3">
        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <span>Available for deliveries</span>
          <button
            className={`px-3 py-1 rounded-lg ${isAvailable ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={toggleAvailability}
            disabled={toggling}
          >
            {isAvailable ? "Go Offline" : "Go Online"}
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <span>Completed Deliveries</span>
          <span className="text-gray-500">{completed}</span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <span>Earnings Summary</span>
          <span className="text-gray-500">{">"}</span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <span>Support</span>
          <span className="text-gray-500">{">"}</span>
        </div>
      </div>

      <div className="px-4 mt-8">
        <button className="w-full py-3 bg-red-500 text-white rounded-lg shadow-md active:scale-95 transition">Logout</button>
      </div>

      <BottomNav />
    </div>
  );
}
