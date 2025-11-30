import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCart } from "../../utils/Cart";

export default function BottomNav() {
  const [count, setCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const update = () => setCount(getCart().length);
    update();
    window.addEventListener("cartUpdated", update);
    return () => window.removeEventListener("cartUpdated", update);
  }, []);

  // Helper to determine if a path is active
  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      name: "Home",
      path: "/customer/home",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: "Orders",
      path: "/customer/orders",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      name: "Cart",
      path: "/customer/cart",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      badge: count > 0 ? count : null, // Only show badge if count > 0
    },
    {
      name: "Profile",
      path: "/customer/profile",
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
        {/* Optional: Top Highlight Line for depth */}
        <div className="absolute top-0 w-12 h-1 bg-gray-200/50 rounded-full mx-auto left-0 right-0 mt-2" />

        {navItems.map((item) => {
          const active = isActive(item.path);
          
          return (
            <Link key={item.name} to={item.path} className="w-full">
              <button
                className={`
                  relative group flex flex-col items-center justify-center w-full h-full 
                  transition-all duration-300 ease-out focus:outline-none
                  active:scale-95
                `}
              >
                {/* Icon Container */}
                <div
                  className={`
                    p-2 rounded-xl transition-all duration-300 mb-1
                    ${active 
                      ? "bg-gradient-to-tr from-indigo-50 to-pink-50 text-indigo-600 shadow-sm translate-y-[-4px]" 
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  {/* Badge for Cart */}
                  {item.badge && (
                    <span className="absolute top-1 right-[25%] flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-[10px] font-bold text-white shadow-md ring-2 ring-white z-10 animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  
                  {/* Icon SVG */}
                  {item.icon}
                </div>

                {/* Label */}
                <span
                  className={`
                    text-[10px] font-medium tracking-wide transition-all duration-300
                    ${active 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 scale-105" 
                      : "text-gray-400"
                    }
                  `}
                >
                  {item.name}
                </span>

                {/* Active Indicator Dot */}
                {active && (
                  <span className="absolute -bottom-2 w-1 h-1 rounded-full bg-indigo-500" />
                )}
              </button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}