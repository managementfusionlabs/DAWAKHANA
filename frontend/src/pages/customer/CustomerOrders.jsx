import BottomNav from "../../components/ui/BottomNav";

export default function CustomerOrders() {
  const orders = [
    {
      id: "DWA-001",
      status: "Delivered",
      date: "26 Nov 2025",
      total: 450,
    },
    {
      id: "DWA-002",
      status: "On the way",
      date: "27 Nov 2025",
      total: 320,
    },
    {
      id: "DWA-003",
      status: "Pending",
      date: "28 Nov 2025",
      total: 210,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold">My Orders</h1>
      </div>

      {/* Orders List */}
      <div className="px-4 mt-4 flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-gray-700">Order: {order.id}</p>
              <p className="text-sm text-gray-500">{order.date}</p>

              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full mt-2 inline-block
                  ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "On the way"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {order.status}
              </span>
            </div>

            <div className="text-right">
              <p className="font-bold text-gray-700">₹{order.total}</p>
              <button className="text-blue-600 text-sm mt-2">View</button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
