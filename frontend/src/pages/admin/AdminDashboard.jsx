import MainLayout from "../../components/layout/MainLayout";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Orders", value: 3421, color: "bg-blue-600" },
    { title: "Pharmacies", value: 42, color: "bg-green-600" },
    { title: "Customers", value: 1580, color: "bg-purple-600" },
    { title: "Delivery Agents", value: 108, color: "bg-orange-600" },
  ];

  const recent = [
    { id: "ORD-2101", user: "Sameer Khan", value: 450, status: "Delivered" },
    { id: "ORD-2102", user: "Aqsa Mir", value: 320, status: "Pending" },
    { id: "ORD-2103", user: "Bilal Bhat", value: 280, status: "Packed" },
  ];

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl shadow text-white ${s.color}`}
          >
            <p className="text-lg">{s.title}</p>
            <p className="text-3xl font-bold mt-2">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            View All
          </button>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2">Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {recent.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="py-3">{o.id}</td>
                <td>{o.user}</td>
                <td>₹{o.value}</td>
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
