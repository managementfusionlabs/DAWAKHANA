import { useState, useMemo } from "react";
import MainLayout from "../../components/layout/MainLayout";

export default function AdminDeliveryAgents() {
  const initial = [
    { id: "DLV-001", name: "Adil Lone", phone: "+91 9876543210", email: "adil.rider@example.com", deliveries: 220, status: "Active", joined: "2024-10-02" },
    { id: "DLV-002", name: "Rizwan Dar", phone: "+91 9100001122", email: "rizwan@example.com", deliveries: 128, status: "Suspended", joined: "2024-12-15" },
    { id: "DLV-003", name: "Aqib Mir", phone: "+91 9588212345", email: "aqib.rider@example.com", deliveries: 89, status: "Active", joined: "2025-02-03" },
    { id: "DLV-004", name: "Shahnawaz Bhat", phone: "+91 9922334455", email: "shahnawaz@example.com", deliveries: 57, status: "Active", joined: "2025-03-11" },
  ];

  const [agents, setAgents] = useState(initial);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return agents.filter((a) => {
      if (filter !== "All" && a.status !== filter) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.phone.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
      );
    });
  }, [agents, filter, query]);

  const toggleStatus = (id) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "Active" ? "Suspended" : "Active" }
          : a
      )
    );
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Delivery Agents</h1>

        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow">
          + Add Agent
        </button>
      </div>

      {/* Search + Filters */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, phone or ID..."
            className="w-full p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="flex gap-2">
          {["All", "Active", "Suspended"].map((s) => (
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
              <th>Deliveries</th>
              <th>Status</th>
              <th>Joined</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {visible.map((a) => (
              <tr key={a.id} className="border-b">
                <td className="py-3">{a.id}</td>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td>{a.deliveries}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      a.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>

                <td>{a.joined}</td>

                <td className="flex gap-3">
                  <button className="text-blue-600">View</button>
                  <button
                    onClick={() => toggleStatus(a.id)}
                    className={`font-semibold ${
                      a.status === "Active" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {a.status === "Active" ? "Suspend" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visible.length === 0 && (
          <p className="text-center text-gray-500 py-6">No delivery agents found.</p>
        )}
      </div>
    </MainLayout>
  );
}
