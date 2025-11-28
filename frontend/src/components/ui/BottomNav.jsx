import { Link } from "react-router-dom";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-xl py-3 flex justify-around">
      <Link to="/customer">
        <button className="text-gray-500">Home</button>
      </Link>

      <Link to="/customer/orders">
        <button className="text-gray-500">Orders</button>
      </Link>

      <Link to="/customer/cart">
        <button className="text-gray-500">Cart</button>
      </Link>

      <Link to="/customer/profile">
        <button className="text-gray-500">Profile</button>
      </Link>
    </div>
  );
}
