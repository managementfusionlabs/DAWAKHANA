import { useState, useMemo } from "react";
import MainLayout from "../../components/layout/MainLayout";

/**
 * Admin Customers Page
 * - Search by name/email/phone
 * - Filter by status
 * - Block / Unblock action
 * - Quick "View Orders" placeholder button
 * - Export visible rows to CSV
 *
 * Replace mock data with API calls later (axios/fetch).
 */

export default function AdminCustomers() {
  const initial = [
    { id: "CUS-001", name: "Sameer Khan", phone: "+91 9876543210", email: "sameer@example.com", orders: 12, status: "Active", joined: "2025-01-12" },
    { id: "CUS-002", name: "Aqsa Mir", phone: "+91 9988776655", email: "aqsa@example.com", orders: 3, status: "Blocked", joined: "2024-11-02" },
    { id: "CUS-003", name: "Bilal Bhat", phone: "+91 9123456780", email: "bilal@example.com", orders: 7, status: "Active", joined: "2025-05-18" },
    { id: "CUS-004", name: "Mehvish Jan", phone: "+91 9012345678", email: "mehvish@example.com", orders: 0, status: "Active", joined: "2025-07-03" },
  ];

  const [customers, setCustomers] = useState(initial);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  // simple search + filter
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return customers.filter((c) => {
      if (filter !== "All" && c.status !== filter) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    });
  }, [customers, filter, query]);

  const toggleBlock = (id) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === "Active" ? "Blocked" : "Active" } : c))
    );
  };

  const exportCSV = () => {
    const rows = [
      ["ID", "Name", "Email", "Phone", "Orders", "Status", "Joined"],
      ...visible.map((c) => [c.id, c.name, c.email, c.phone, c.orders, c.status, c.joined]),
    ];
    const csvContent = rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `customers_export_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Customers</h1>

        <div className="flex gap-3">
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:brightness-95 transition"
          >
            Export CSV
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow">
            + Add Customer
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, phone or id..."
            className="w-full p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="flex gap-2">
          {["All", "Active", "Blocked"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg border transition ${
                filter === s ? "bg-blue-600 text-white" : "bg-white text-gray-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders</th>
              <th>Status</th>
              <th>Joined</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {visible.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="py-3">{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.orders}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      c.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td>{c.joined}</td>

                <td className="flex gap-3">
                  <button
                    onClick={() => alert(`Open orders for ${c.name} (implement route)`)}
                    className="text-blue-600"
                  >
                    View Orders
                  </button>

                  <button
                    onClick={() => toggleBlock(c.id)}
                    className={`font-semibold ${c.status === "Active" ? "text-red-600" : "text-green-600"}`}
                  >
                    {c.status === "Active" ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visible.length === 0 && <p className="text-center text-gray-500 py-6">No customers found.</p>}
      </div>
    </MainLayout>
  );
}
