import BottomNav from "../../components/ui/BottomNav";

export default function DeliveryHistory() {
  const history = [
    {
      id: "DWA-001",
      date: "26 Nov 2025",
      total: 450,
      status: "Delivered",
    },
    {
      id: "DWA-004",
      date: "24 Nov 2025",
      total: 390,
      status: "Delivered",
    },
    {
      id: "DWA-006",
      date: "22 Nov 2025",
      total: 520,
      status: "Delivered",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header */}
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold">Delivery History</h1>
      </div>

      {/* History List */}
      <div className="px-4 mt-4 flex flex-col gap-4">
        {history.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-gray-700">Order: {order.id}</p>
              <p className="text-sm text-gray-500">{order.date}</p>

              <span className="px-3 py-1 mt-2 inline-block rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                Delivered
              </span>
            </div>

            <div className="text-right">
              <p className="font-bold text-gray-700">₹{order.total}</p>
              <button className="text-blue-600 text-sm mt-2">
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
