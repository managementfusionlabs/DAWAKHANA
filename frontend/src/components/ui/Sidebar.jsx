import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-blue-600">Dawakhana</h1>

      <nav className="flex flex-col gap-3 text-gray-700">
        <Link to="/admin" className="hover:text-blue-600 transition">Admin Dashboard</Link>
        <Link to="/admin/pharmacies" className="hover:text-blue-600 transition">Pharmacies</Link>
        <Link to="/admin/customers" className="hover:text-blue-600 transition">Customers</Link>
        <Link to="/admin/delivery-agents" className="hover:text-blue-600 transition">Delivery Agents</Link>
        <Link to="/admin/orders" className="hover:text-blue-600 transition">Orders</Link>
      </nav>
    </div>
  );
}
