import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import BottomNav from "../../components/ui/BottomNav";
import { addToCart } from "../../utils/Cart";

// -- Simple Icons --
const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const StoreIcon = () => (
  <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m8-2a2 2 0 01-2-2h-4a2 2 0 01-2 2v-4a2 2 0 012-2h4a2 2 0 012 2v4z" />
  </svg>
);

const PillIcon = () => (
  <svg className="w-8 h-8 text-indigo-300 opacity-80" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.9 3.6c-1.6-1.6-4.2-1.6-5.8 0l-1.5 1.5c-1.2-0.5-2.6-0.2-3.5 0.7-1.2 1.2-1.2 3.1 0 4.3l7.3 7.3c1.2 1.2 3.1 1.2 4.3 0 0.9-0.9 1.2-2.3 0.7-3.5l1.5-1.5c1.6-1.6 1.6-4.2 0-5.8l-3-3zM5.6 8.6c-0.4-0.4-0.4-1.1 0-1.5s1.1-0.4 1.5 0l7.3 7.3c0.4 0.4 0.4 1.1 0 1.5s-1.1 0.4-1.5 0L5.6 8.6z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export default function CustomerHome() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    setLoading(true);
    axios.get("/customer/medicines")
      .then((res) => setItems(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = items.filter((i) =>
    i.medicine?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (item) => {
    addToCart({
      inventoryId: item._id,
      medicineId: item.medicine?._id,
      medicineName: item.medicine?.name,
      price: item.price,
      qty: 1,
      pharmacyId: item.pharmacy?._id,
    });

    window.dispatchEvent(new Event("cartUpdated"));
    
    // Custom Toast Animation
    setToast({ show: true, message: `Added ${item.medicine?.name} to cart` });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-32 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* --- Sticky Header with Glassmorphism --- */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-md mx-auto px-5 pt-4 pb-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h1 className="text-2xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Dawakhana
              </h1>
              <p className="text-xs text-gray-500 font-medium">Find your meds nearby</p>
            </div>
            {/* User Avatar Placeholder */}
            <div className="w-9 h-9 rounded-full bg-linear-to-tr from-indigo-100 to-pink-100 border border-white shadow-sm flex items-center justify-center text-xs font-bold text-indigo-600">
              U
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search medicines, pills, syrups..."
              className="
                w-full pl-10 pr-4 py-3 rounded-2xl 
                bg-gray-100/50 border-transparent 
                focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 
                transition-all duration-300 text-sm font-medium shadow-inner"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="max-w-md mx-auto px-4 mt-6">
        
        {/* Section Title */}
        <div className="flex justify-between items-end mb-4 px-1">
          <h2 className="text-lg font-bold text-gray-800">Available Medicines</h2>
          <span className="text-xs text-gray-400 font-medium">{filtered.length} results</span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-24 bg-white rounded-2xl shadow-sm animate-pulse flex p-4 gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-xl"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {!loading && filtered.map((item) => (
            <div
              key={item._id}
              className="
                group relative bg-white rounded-2xl p-4 
                border border-gray-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]
                hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] 
                hover:border-indigo-100 transition-all duration-300
              "
            >
              <div className="flex sm:flex-col gap-4 items-center sm:items-start">
                
                {/* Visual Icon / Placeholder */}
                <div className="
                  shrink-0 w-16 h-16 sm:w-full sm:h-32 
                  bg-indigo-50/50 rounded-xl 
                  flex items-center justify-center 
                  group-hover:scale-105 transition-transform duration-300
                ">
                  <PillIcon />
                </div>

                {/* Content Info */}
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      {/* Medicine Form Badge (Tablet/Syrup) */}
                      <span className="inline-block px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">
                        {item.medicine?.form || "Medicine"}
                      </span>
                      <h3 className="font-bold text-gray-800 truncate pr-2">
                        {item.medicine?.name}
                      </h3>
                    </div>
                  </div>

                  {/* Pharmacy Name */}
                  <div className="flex items-center gap-1 mt-1 text-gray-400">
                    <StoreIcon />
                    <p className="text-xs font-medium truncate">
                      {item.pharmacy?.storeName}
                    </p>
                  </div>

                  {/* Price and Add Button Row */}
                  <div className="flex items-center justify-between mt-3 sm:mt-4">
                    <p className="text-lg font-bold text-gray-900">
                      <span className="text-xs text-gray-400 font-normal align-top mr-0.5">₹</span>
                      {item.price}
                    </p>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="
                        flex items-center justify-center w-8 h-8 rounded-full
                        bg-white text-indigo-600 border border-gray-200
                        hover:bg-linear-to-r hover:from-indigo-600 hover:to-pink-600 
                        hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-indigo-500/30
                        active:scale-90 transition-all duration-200
                      "
                      aria-label="Add to cart"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!loading && filtered.length === 0 && (
            <div className="col-span-full py-12 text-center opacity-60">
               <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                 <SearchIcon />
               </div>
               <p className="text-gray-500 font-medium">No medicines found matching "{search}"</p>
            </div>
          )}
        </div>
      </main>

      {/* --- Toast Notification (Floating) --- */}
      <div 
        className={`
          fixed bottom-24 left-1/2 transform -translate-x-1/2 
          bg-gray-900/90 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-2xl 
          flex items-center gap-3 z-50 transition-all duration-300 ease-in-out w-[90%] max-w-sm
          ${toast.show ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm font-medium truncate">{toast.message}</p>
      </div>

      <BottomNav />
    </div>
  );
}