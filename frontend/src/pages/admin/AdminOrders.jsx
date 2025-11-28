import { useState, useMemo } from "react";
import MainLayout from "../../components/layout/MainLayout";

export default function AdminOrders() {
  const initial = [
    {
      id: "ORD-2101",
      customer: "Sameer Khan",
      pharmacy: "GreenLife Pharmacy",
      agent: "Adil Lone",
      amount: 450,
      status: "Delivered",
      date: "2025-10-20",
    },
    {
      id: "ORD-2102",
      customer: "Aqsa Mir",
      pharmacy: "CityMed Pharmacy",
      agent: "Rizwan Dar",
      amount: 320,
      status: "Pending",
      date: "2025-10-22",
    },
    {
      id: "ORD-2103",
      customer: "Bilal Bhat",
      pharmacy: "HealthPlus Medical",
      agent: "Aqib Mir",
      amount: 280,
      status: "Packed",
      date: "2025-10-23",
    },
    {
      id: "ORD-2104",
      customer: "Mehvish Jan",
      pharmacy: "CareWell Pharmacy",
      agent: "Shahnawaz Bhat",
      amount: 199,
      status: "Ready",
      date: "2025-10-22",
    },
  ];

  const [orders, setOrders] = useState(initial);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (filter !== "All" && o.status !== filter) return false;
      if (!q) return true;
      return (
        o.customer.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.pharmacy.toLowerCase().includes(q) ||
        o.agent.toLowerCase().includes(q)
      );
    });
  }, [orders, filter, query]);

  const exportCSV = () => {
    const rows = [
      ["ID", "Customer", "Pharmacy", "Delivery Agent", "Amount", "Status", "Date"],
      ...visible.map((o) => [
        o.id,
        o.customer,
        o.pharmacy,
        o.agent,
        o.amount,
        o.status,
        o.date,
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Orders</h1>

        <button
          onClick={exportCSV}
          className="px-5 py-2 bg-green-600 text-white rounded-lg shadow"
        >
          Export CSV
        </button>
      </div>

      {/* Search + Filters */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order ID, customer, pharmacy, or delivery agent..."
            className="w-full p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="flex gap-2">
          {["All", "Pending", "Packed", "Ready", "Delivered"].map((s) => (
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
              <th>Customer</th>
              <th>Pharmacy</th>
              <th>Delivery Agent</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {visible.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="py-3">{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.pharmacy}</td>
                <td>{o.agent}</td>
                <td>₹{o.amount}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      o.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : o.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : o.status === "Packed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>

                <td>{o.date}</td>

                <td>
                  <button className="text-blue-600">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visible.length === 0 && (
          <p className="text-center text-gray-500 py-6">No orders found.</p>
        )}
      </div>
    </MainLayout>
  );
}
