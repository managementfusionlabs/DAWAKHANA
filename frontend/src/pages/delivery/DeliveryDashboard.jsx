import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/ui/BottomNav"; // Assuming you have a Delivery version of this

// --- Icons ---
const MapPinIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const TruckIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

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
      .catch((err) => console.error("Failed to fetch deliveries:", err))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const activeOrder = orders.find((o) => o.status !== "delivered");
  const pendingOrders = orders.filter((o) => o._id !== activeOrder?._id && o.status !== "delivered");

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `/delivery/status/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      // Refresh list
      const res = await axios.get("/delivery/my-deliveries", { withCredentials: true });
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-28 font-sans">
      
      {/* --- Sticky Header --- */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 px-5 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-xs text-gray-500 font-medium">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs border-2 border-white shadow-sm">
          ON
        </div>
      </div>

      <div className="px-4 mt-6 max-w-md mx-auto space-y-8">
        
        {/* --- Section: Active Job (Hero Card) --- */}
        <div>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Current Task</h2>

          {loading ? (
            <div className="h-64 bg-gray-200 rounded-3xl animate-pulse" />
          ) : activeOrder ? (
            <div className="relative overflow-hidden rounded-3xl shadow-[0_20px_40px_-15px_rgba(79,70,229,0.4)]">
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-800 z-0" />
              
              {/* Decor Circle */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 p-6 text-white">
                {/* Header Row */}
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold border border-white/10 uppercase tracking-wide">
                    {activeOrder.status.replace(/_/g, " ")}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">₹{activeOrder.finalAmount || activeOrder.totalAmount}</p>
                    <p className="text-xs text-indigo-200 uppercase">{activeOrder.paymentStatus}</p>
                  </div>
                </div>

                {/* Address Info */}
                <div className="mb-8 space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="mt-1 p-1.5 bg-indigo-500/50 rounded-lg"><UserIcon /></div>
                    <div>
                      <p className="text-xs text-indigo-200 uppercase font-bold">Customer</p>
                      <p className="text-lg font-semibold">{activeOrder.customer?.name || "Guest"}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <div className="mt-1 p-1.5 bg-indigo-500/50 rounded-lg"><MapPinIcon /></div>
                    <div>
                      <p className="text-xs text-indigo-200 uppercase font-bold">Delivery Address</p>
                      <p className="text-base leading-relaxed opacity-95">
                        {activeOrder.address?.addressLine}, {activeOrder.address?.city} - {activeOrder.address?.pincode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary Actions Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Call Button */}
                  <a 
                    href={`tel:${activeOrder.customer?.phone}`}
                    className="
                      flex items-center justify-center gap-2 py-3 rounded-xl 
                      bg-white/10 border border-white/20 hover:bg-white/20 
                      transition active:scale-95 font-semibold text-sm
                    "
                  >
                    <PhoneIcon /> Call
                  </a>

                  {/* Dynamic Action Button */}
                  {activeOrder.status === 'out_for_delivery' ? (
                    <button
                      onClick={() => updateStatus(activeOrder._id, "delivered")}
                      className="
                        flex items-center justify-center gap-2 py-3 rounded-xl 
                        bg-green-500 text-white shadow-lg shadow-green-900/20
                        hover:bg-green-400 transition active:scale-95 font-bold text-sm
                      "
                    >
                      <CheckCircleIcon /> Complete
                    </button>
                  ) : (
                    <button
                      onClick={() => updateStatus(activeOrder._id, "out_for_delivery")}
                      className="
                        flex items-center justify-center gap-2 py-3 rounded-xl 
                        bg-white text-indigo-700 shadow-lg 
                        hover:bg-gray-50 transition active:scale-95 font-bold text-sm
                      "
                    >
                      <TruckIcon /> Start Delivery
                    </button>
                  )}
                </div>

                {/* View Details Link */}
                <button 
                   onClick={() => navigate(`/delivery/order/${activeOrder._id}`)}
                   className="w-full mt-4 text-xs font-medium text-center text-indigo-200 hover:text-white transition"
                >
                  View full order details &rarr;
                </button>
              </div>
            </div>
          ) : (
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-dashed border-gray-300 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircleIcon />
                </div>
                <h3 className="text-gray-800 font-bold">All caught up!</h3>
                <p className="text-gray-500 text-sm">You have no active deliveries right now.</p>
             </div>
          )}
        </div>

        {/* --- Section: Queue --- */}
        {pendingOrders.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Up Next ({pendingOrders.length})</h2>
            <div className="space-y-3">
              {pendingOrders.map((o) => (
                <div 
                  key={o._id} 
                  onClick={() => navigate(`/delivery/order/${o._id}`)}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center active:bg-gray-50 transition"
                >
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs">
                      #{o._id.slice(-3)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm truncate w-40">{o.address?.addressLine || "No Address"}</p>
                      <p className="text-xs text-gray-500">{o.customer?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-500 uppercase">
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>

      <BottomNav />
    </div>
  );
}