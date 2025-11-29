import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCart } from "../../utils/Cart";

export default function BottomNav() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(getCart().length);
    update();
    window.addEventListener("cartUpdated", update);
    return () => window.removeEventListener("cartUpdated", update);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-xl py-3 flex justify-around">
      <Link to="/customer/home">
        <button className="text-gray-500">Home</button>
      </Link>

      <Link to="/customer/orders">
        <button className="text-gray-500">Orders</button>
      </Link>

      <Link to="/customer/cart">
        <button className="text-gray-500">Cart ({count})</button>
      </Link>

      <Link to="/customer/profile">
        <button className="text-gray-500">Profile</button>
      </Link>
    </div>
  );
}
