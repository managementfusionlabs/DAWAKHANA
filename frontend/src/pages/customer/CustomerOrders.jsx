import { useEffect, useState } from "react";
import BottomNav from "../../components/ui/BottomNav";
import axios from "../../api/axios";

// --- Helper for Status Colors & Icons ---
const getStatusConfig = (status) => {
  const configs = {
    delivered: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "Delivered", icon: "✓" },
    out_for_delivery: { color: "bg-orange-100 text-orange-700 border-orange-200", label: "On the way", icon: "🚚" },
    cancelled: { color: "bg-red-50 text-red-600 border-red-100", label: "Cancelled", icon: "✕" },
    rejected: { color: "bg-red-50 text-red-600 border-red-100", label: "Rejected", icon: "✕" },
    pending: { color: "bg-amber-50 text-amber-600 border-amber-100", label: "Pending", icon: "⏳" },
    processing: { color: "bg-blue-50 text-blue-600 border-blue-100", label: "Processing", icon: "⚙️" },
    default: { color: "bg-gray-100 text-gray-600 border-gray-200", label: status, icon: "•" },
  };
  return configs[status] || configs.default;
};

// --- Simple Icons ---
const ShoppingBagIcon = () => (
  <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const PharmacyIcon = () => (
  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m8-2a2 2 0 01-2-2h-4a2 2 0 01-2 2v-4a2 2 0 012-2h4a2 2 0 012 2v4z" />
  </svg>
);

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smoother UX or fetch real data
    axios
      .get("/order/my-orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // Sorting by date (newest first)
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sorted);
      })
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-32 font-sans">
      {/* --- Header --- */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-md mx-auto px-5 py-4">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            My Orders
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Track your past and active orders
          </p>
        </div>
      </header>

      {/* --- Content --- */}
      <main className="max-w-md mx-auto px-4 mt-6">
        
        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-white rounded-2xl animate-pulse shadow-sm" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 opacity-70">
            <ShoppingBagIcon />
            <h3 className="text-lg font-bold text-gray-700">No orders yet</h3>
            <p className="text-sm text-gray-500">Your order history will appear here.</p>
          </div>
        )}

        {/* Orders List */}
        <div className="flex flex-col gap-4">
          {!loading && orders.map((order) => {
            const statusStyle = getStatusConfig(order.status);
            const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric"
            });
            const itemCount = order.items?.length || 0;
            const firstItemName = order.items?.[0]?.medicine?.name || "Medicine";

            return (
              <div
                key={order._id}
                className="
                  group relative bg-white rounded-2xl p-5 
                  border border-gray-100 
                  shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]
                  hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]
                  hover:border-indigo-100
                  transform transition-all duration-300 ease-out
                  hover:-translate-y-1
                  cursor-pointer
                  overflow-hidden
                "
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/0 via-indigo-50/30 to-purple-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Row: Order ID & Status */}
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                      #{order._id.slice(-6)}
                    </p>
                    {/* Pharmacy Name */}
                    <div className="flex items-center text-gray-800 font-bold mt-1 text-base">
                      <PharmacyIcon />
                      <span className="truncate max-w-[150px]">
                        {order.pharmacy?.storeName || "Unknown Pharmacy"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <span className={`
                    text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 shadow-sm
                    ${statusStyle.color}
                  `}>
                    <span>{statusStyle.icon}</span>
                    {statusStyle.label}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gray-50 my-3 group-hover:bg-indigo-50 transition-colors" />

                {/* Middle Row: Items Summary */}
                <div className="relative z-10">
                  <p className="text-sm text-gray-600 font-medium truncate">
                    {itemCount > 0 
                      ? `${firstItemName} ${itemCount > 1 ? `+ ${itemCount - 1} more` : ""}`
                      : "Medicines"
                    }
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Ordered on {date}</p>
                </div>

                {/* Bottom Row: Price & Action */}
                <div className="flex justify-between items-end mt-4 relative z-10">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Total Amount</p>
                    <p className="text-lg font-bold text-gray-900">
                      ₹{order.finalAmount}
                    </p>
                  </div>

                  {/* Arrow Interaction */}
                  <div className="
                    flex items-center gap-1 text-xs font-bold text-indigo-600 
                    opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 
                    transition-all duration-300
                  ">
                    View Details <ArrowRightIcon />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}