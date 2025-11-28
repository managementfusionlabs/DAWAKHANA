import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";

export default function PharmacyInventory() {
  const [filter, setFilter] = useState("All");

  const meds = [
    { id: 1, name: "Paracetamol 500mg", category: "Tablet", stock: 120, price: 30 },
    { id: 2, name: "Cough Syrup 100ml", category: "Syrup", stock: 45, price: 90 },
    { id: 3, name: "Vitamin C 500mg", category: "Tablet", stock: 15, price: 120 },
    { id: 4, name: "Pain Relief Gel", category: "Gel", stock: 8, price: 140 },
  ];

  const filteredMeds =
    filter === "All" ? meds : meds.filter((m) => m.category === filter);

  return (
    <MainLayout>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">Inventory</h1>

        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow">
          + Add Medicine
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {["All", "Tablet", "Syrup", "Gel"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg border transition ${
              filter === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search medicine..."
          className="w-full p-3 border rounded-xl bg-gray-50"
        />
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredMeds.map((m) => (
              <tr key={m.id} className="border-b">
                <td className="py-3">{m.id}</td>
                <td>{m.name}</td>
                <td>{m.category}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      m.stock < 10
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {m.stock}
                  </span>
                </td>
                <td>₹{m.price}</td>
                <td className="flex gap-3">
                  <button className="text-blue-600">Edit</button>
                  <button className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMeds.length === 0 && (
          <p className="text-center text-gray-500 py-6">No medicines found.</p>
        )}
      </div>
    </MainLayout>
  );
}
