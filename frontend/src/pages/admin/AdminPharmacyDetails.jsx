import MainLayout from "../../components/layout/MainLayout";
import { useState } from "react";

export default function AdminPharmacyDetails() {
  // Mock data — later fetch by ID using axios + params
  const pharmacy = {
    id: "PHM-001",
    name: "GreenLife Pharmacy",
    owner: "Adil Lone",
    phone: "+91 9876543210",
    email: "greenlife@pharmacy.com",
    address: "Rajbagh, Srinagar",
    status: "Active",
    totalOrders: 1280,
    revenue: 425600,
    medicines: 342,
  };

  const recentOrders = [
    { id: "ORD-2101", customer: "Sameer Khan", total: 450, status: "Delivered" },
    { id: "ORD-2102", customer: "Aqsa Mir", total: 320, status: "Pending" },
    { id: "ORD-2103", customer: "Bilal Bhat", total: 280, status: "Packed" },
  ];

  const [status, setStatus] = useState(pharmacy.status);

  const toggleStatus = () => {
    setStatus((s) => (s === "Active" ? "Suspended" : "Active"));
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Pharmacy Details</h1>

      {/* Top Info Card */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold">{pharmacy.name}</h2>
            <p className="text-gray-600 mt-1">
              Owner: <span className="font-medium">{pharmacy.owner}</span>
            </p>
            <p className="text-gray-600">Email: {pharmacy.email}</p>
            <p className="text-gray-600">Phone: {pharmacy.phone}</p>
            <p className="text-gray-600">Address: {pharmacy.address}</p>
          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={toggleStatus}
            className={`px-5 py-2 rounded-lg shadow text-white ${
              status === "Active" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {status === "Active" ? "Suspend" : "Activate"}
          </button>

          <button className="px-5 py-2 bg-blue-600 rounded-lg text-white shadow">
            Edit Details
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600">Total Orders</p>
          <p className="text-3xl font-semibold mt-2">{pharmacy.totalOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600">Revenue Generated</p>
          <p className="text-3xl font-semibold mt-2">₹{pharmacy.revenue}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600">Medicines</p>
          <p className="text-3xl font-semibold mt-2">{pharmacy.medicines}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            View All
          </button>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="py-3">{o.id}</td>
                <td>{o.customer}</td>
                <td>₹{o.total}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      o.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : o.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>

                <td>
                  <button className="text-blue-600">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
