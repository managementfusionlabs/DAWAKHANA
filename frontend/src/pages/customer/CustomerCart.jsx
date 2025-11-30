import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BottomNav from "../../components/ui/BottomNav";
import { getCart, updateQty, removeFromCart } from "../../utils/Cart";
import axios from "../../api/axios";

// --- Icons ---
const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EmptyCartIcon = () => (
  <svg className="w-24 h-24 text-indigo-100 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

export default function CustomerCart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  // --- Derived State ---
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40; // Mock logic: Free delivery over 500
  const grandTotal = subtotal + (cart.length > 0 ? deliveryFee : 0);
  
  // Identify conflicts (items from different pharmacies)
  const pharmacies = [...new Set(cart.map((i) => i.pharmacyId))];
  const hasConflict = pharmacies.length > 1;

  // --- Handlers ---
  const changeQty = (id, qty) => {
    if (qty < 1) return;
    setCart(updateQty(id, qty));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    setCart(removeFromCart(id));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const checkout = async () => {
    if (cart.length === 0) return;
    if (hasConflict) {
      alert("Please remove items from other pharmacies to proceed.");
      return;
    }

    setLoading(true);

    const payload = {
      pharmacyId: pharmacies[0],
      items: cart.map((i) => ({
        medicineId: i.medicineId,
        quantity: i.qty,
        price: i.price,
      })),
      address: {
        addressLine: "Residency Road",
        city: "Srinagar",
        state: "JK",
        pincode: "190001",
      },
    };

    try {
      await axios.post("/order/create", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      navigate("/customer/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // --- Empty State View ---
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-20">
        <EmptyCartIcon />
        <h2 className="text-xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 mb-6 mt-1">Looks like you haven't added anything yet.</p>
        <Link to="/customer/home">
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 hover:scale-105 transition transform">
            Browse Medicines
          </button>
        </Link>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-44 font-sans">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-5 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-extrabold text-gray-900">Cart <span className="text-gray-400 font-medium text-sm ml-1">({cart.length} items)</span></h1>
      </div>

      <div className="px-4 mt-6 max-w-md mx-auto space-y-6">
        
        {/* 1. Address Summary (Mock) */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-3">
          <div className="p-2 bg-indigo-50 rounded-full shrink-0">
            <LocationIcon />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Delivering to</p>
            <p className="text-sm font-semibold text-gray-800">Home • Residency Road, Srinagar</p>
          </div>
          <button className="ml-auto text-xs font-bold text-indigo-600">CHANGE</button>
        </div>

        {/* 2. Pharmacy Conflict Warning */}
        {hasConflict && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex gap-3 animate-pulse">
            <AlertIcon />
            <div>
              <p className="text-sm font-bold text-red-800">Multiple Stores Detected</p>
              <p className="text-xs text-red-600 mt-1">
                You can only order from one pharmacy at a time. Please remove items to proceed.
              </p>
            </div>
          </div>
        )}

        {/* 3. Cart Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.inventoryId}
              className="bg-white p-4 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  {/* Item Icon */}
                  <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-indigo-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12.9 3.6c-1.6-1.6-4.2-1.6-5.8 0l-1.5 1.5c-1.2-0.5-2.6-0.2-3.5 0.7-1.2 1.2-1.2 3.1 0 4.3l7.3 7.3c1.2 1.2 3.1 1.2 4.3 0 0.9-0.9 1.2-2.3 0.7-3.5l1.5-1.5c1.6-1.6 1.6-4.2 0-5.8l-3-3zM5.6 8.6c-0.4-0.4-0.4-1.1 0-1.5s1.1-0.4 1.5 0l7.3 7.3c0.4 0.4 0.4 1.1 0 1.5s-1.1 0.4-1.5 0L5.6 8.6z" /></svg>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">{item.medicineName}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">₹{item.price} / unit</p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.inventoryId)}
                  className="p-2 -mr-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <TrashIcon />
                </button>
              </div>

              {/* Controls Row */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                
                {/* Stepper */}
                <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                  <button
                    onClick={() => changeQty(item.inventoryId, item.qty - 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm rounded-l-lg transition"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-gray-800">{item.qty}</span>
                  <button
                    onClick={() => changeQty(item.inventoryId, item.qty + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm rounded-r-lg transition"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold text-gray-900">₹{item.price * item.qty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Bill Details */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 text-sm">Bill Details</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Item Total</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery Fee</span>
              {deliveryFee === 0 ? (
                <span className="text-green-600 font-bold">FREE</span>
              ) : (
                <span>₹{deliveryFee}</span>
              )}
            </div>
            {/* Divider */}
            <div className="h-px bg-gray-100 my-2" />
            
            <div className="flex justify-between text-base font-extrabold text-gray-900">
              <span>To Pay</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Floating Bar */}
      {/* Positioned above BottomNav */}
      <div className="fixed bottom-[80px] left-0 w-full px-4 z-20">
        <div className="
          max-w-md mx-auto 
          bg-white/90 backdrop-blur-md 
          p-4 rounded-2xl 
          shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] 
          border border-white/50
          flex justify-between items-center
        ">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">Total</p>
            <p className="text-xl font-extrabold text-gray-900">₹{grandTotal}</p>
          </div>

          <button
            onClick={checkout}
            disabled={hasConflict || loading}
            className={`
              px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95
              ${hasConflict 
                ? "bg-gray-300 cursor-not-allowed shadow-none" 
                : "bg-linear-to-r from-indigo-600 to-purple-600 shadow-indigo-500/30 hover:shadow-indigo-500/50"
              }
            `}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing
              </span>
            ) : (
              "Checkout"
            )}
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}