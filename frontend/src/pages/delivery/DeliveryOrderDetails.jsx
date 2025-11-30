import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";

// --- Icons ---
const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const NavigateIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const TimeIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// --- Bottom Navigation Component (Inlined for Preview) ---
function BottomNav() {
  const location = useLocation();
  
  // Helper to determine if a path is active
  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      name: "Dashboard",
      path: "/delivery/dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: "History",
      path: "/delivery/history",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      name: "Profile",
      path: "/delivery/profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full px-2 pb-2">
      <nav className="
        w-full mx-auto max-w-md 
        bg-white/90 backdrop-blur-xl 
        border border-white/40 
        shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] 
        rounded-t-[2rem] rounded-b-none md:rounded-b-[2rem] 
        flex justify-around items-center 
        h-20 px-2 relative"
      >
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link key={item.name} to={item.path} className="w-full">
              <button className="relative group flex flex-col items-center justify-center w-full h-full transition-all duration-300 ease-out focus:outline-none active:scale-95">
                <div className={`
                    p-2 rounded-xl transition-all duration-300 mb-1
                    ${active ? "bg-indigo-50 text-indigo-600 shadow-sm translate-y-[-4px]" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}
                  `}>
                  {item.icon}
                </div>
                <span className={`
                    text-[10px] font-medium tracking-wide transition-all duration-300
                    ${active ? "text-indigo-600 scale-105" : "text-gray-400"}
                  `}>
                  {item.name}
                </span>
                {active && <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-indigo-500" />}
              </button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

// --- Main Component ---
export default function DeliveryOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    // Fetch order details
    const fetchOrder = async () => {
      try {
        // Use standard axios, you might need to set baseURL in a real app
        // For now we assume the relative path works if proxy is set up, or just standard axios behavior
        const res = await axios.get(`/orders/${id}`, { withCredentials: true });
        if (mounted) setOrder(res.data);
      } catch (err) {
        console.warn("Primary endpoint failed, trying fallback...", err);
        try {
          const res2 = await axios.get(`/delivery/order/${id}`, { withCredentials: true });
          if (mounted) setOrder(res2.data);
        } catch (err2) {
          console.error("Failed to fetch order details", err2);
          // MOCK DATA FOR PREVIEW PURPOSES IF FETCH FAILS
          // Remove this in production
          if (mounted) {
            setOrder({
              _id: id || "ORD-987654",
              createdAt: new Date().toISOString(),
              status: "out_for_delivery",
              paymentStatus: "paid",
              totalAmount: 1250,
              finalAmount: 1250,
              customer: {
                name: "Rahul Sharma",
                phone: "+919876543210"
              },
              address: {
                addressLine: "Flat 402, Green Heights, Residency Road",
                city: "Srinagar",
                pincode: "190001"
              },
              items: [
                {
                  quantity: 2,
                  price: 500,
                  medicine: { name: "Amoxyclav 625", form: "Tablet" }
                },
                {
                  quantity: 1,
                  price: 250,
                  medicine: { name: "Cough Syrup", form: "Syrup" }
                }
              ]
            });
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchOrder();

    return () => (mounted = false);
  }, [id]);

  const updateStatus = async (newStatus) => {
    if (!window.confirm(`Mark this order as ${newStatus.replace(/_/g, " ")}?`)) return;

    try {
      await axios.put(
        `/delivery/status/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setOrder((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error(err);
      // For preview, we allow optimistic update even if API fails
      setOrder((prev) => ({ ...prev, status: newStatus }));
      alert("Status updated (Simulation)");
    }
  };

  const openMaps = (address) => {
    const query = `${address.addressLine}, ${address.city}, ${address.pincode}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-gray-800">Order Not Found</h2>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  // --- Safe Data Accessors ---
  const customer = order.customer || {};
  const address = order.address || {};
  const items = order.items || [];
  
  // Status Logic for UI
  const steps = [
    { key: "ready_for_pickup", label: "Picked Up" },
    { key: "out_for_delivery", label: "On Way" },
    { key: "delivered", label: "Delivered" }
  ];
  
  // Logic to handle active steps
  const activeStep = order.status === 'delivered' ? 2 : (order.status === 'out_for_delivery' ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-28 font-sans">
      
      {/* --- Header --- */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <ArrowLeftIcon />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Order #{order._id}</h1>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <TimeIcon /> {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="ml-auto px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase">
          {order.paymentStatus}
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-6">

        {/* --- 1. Customer & Location Card (High Priority) --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-indigo-50/50 p-4 border-b border-indigo-50">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Delivery Location</h2>
            <div className="flex gap-3 items-start">
              <div className="mt-1 text-indigo-600"><MapPinIcon /></div>
              <div>
                <p className="text-gray-900 font-bold leading-snug">
                  {address.addressLine || "No Address Line"}
                </p>
                <p className="text-gray-500 text-sm">
                  {address.city}, {address.pincode}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 grid grid-cols-2 gap-3">
            {/* Customer Info */}
            <div className="col-span-2 flex justify-between items-center mb-2">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Customer</p>
                <p className="text-gray-800 font-semibold text-lg">{customer.name || "Guest User"}</p>
              </div>
              <a 
                href={`tel:${customer.phone}`}
                className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition"
              >
                <PhoneIcon />
              </a>
            </div>

            {/* Map Action */}
            <button 
              onClick={() => openMaps(address)}
              className="col-span-2 flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 active:scale-95 transition"
            >
              <NavigateIcon /> Get Directions
            </button>
          </div>
        </div>

        {/* --- 2. Status Timeline --- */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Status</h2>
          <div className="relative flex justify-between">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-green-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((step, idx) => {
              const isActive = idx <= activeStep;
              return (
                <div key={step.key} className="flex flex-col items-center gap-2 bg-white px-2">
                  <div className={`
                    w-4 h-4 rounded-full border-2 
                    ${isActive ? "bg-green-500 border-green-500" : "bg-white border-gray-300"}
                  `}></div>
                  <span className={`text-[10px] font-bold ${isActive ? "text-gray-800" : "text-gray-400"}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- 3. Order Items --- */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Items ({items.length})</h2>
          <div className="space-y-4">
            {items.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500">
                    x{item.quantity}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {item.medicine?.name || item.name || "Medicine"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.medicine?.form || "Unit"}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-gray-700">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          
          <div className="h-px bg-gray-100 my-4" />
          
          <div className="flex justify-between items-center text-lg font-extrabold text-gray-900">
            <span>Total to Collect</span>
            <span>₹{order.finalAmount || order.totalAmount}</span>
          </div>
        </div>

      </div>

      {/* --- Bottom Action Bar --- */}
      <div className="fixed bottom-[80px] left-0 w-full px-4">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
          {/* Left Action (Contextual) */}
          {order.status !== 'delivered' && order.status !== 'out_for_delivery' && (
             <button
             onClick={() => updateStatus("out_for_delivery")}
             className="col-span-2 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-lg active:scale-95 transition"
           >
             Start Delivery
           </button>
          )}

          {/* If already out for delivery */}
          {order.status === 'out_for_delivery' && (
            <>
              <button
                onClick={() => window.location.href = `tel:${customer.phone}`}
                className="py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm active:scale-95 transition"
              >
                Can't Reach
              </button>
              <button
                onClick={() => updateStatus("delivered")}
                className="py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-200 active:scale-95 transition"
              >
                Mark Delivered
              </button>
            </>
          )}

          {/* If delivered */}
          {order.status === 'delivered' && (
             <div className="col-span-2 py-3 bg-green-50 text-green-700 font-bold rounded-xl text-center border border-green-100">
               Order Completed ✓
             </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}