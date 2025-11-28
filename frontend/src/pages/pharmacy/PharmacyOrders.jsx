import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

export default function PharmacyOrders() {
  const [filter, setFilter] = useState("All");

  const orders = [
    {
      id: "ORD-101",
      customer: "Sameer Khan",
      total: 350,
      status: "Pending",
    },
    {
      id: "ORD-102",
      customer: "Mehreen Akhtar",
      total: 540,
      status: "Packed",
    },
    {
      id: "ORD-103",
      customer: "Imran Dar",
      total: 220,
      status: "Ready",
    },
    {
      id: "ORD-104",
      customer: "Bilal Lone",
      total: 480,
      status: "Completed",
    },
  ];

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {["All", "Pending", "Packed", "Ready", "Completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg border transition ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Orders..."
          className="w-full p-3 border rounded-xl bg-gray-50"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2">Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="py-3">{o.id}</td>
                <td>{o.customer}</td>
                <td>₹{o.total}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      o.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : o.status === "Packed"
                        ? "bg-blue-100 text-blue-700"
                        : o.status === "Ready"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
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

        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-500 py-6">No orders found.</p>
        )}
      </div>
    </MainLayout>
  );
}
