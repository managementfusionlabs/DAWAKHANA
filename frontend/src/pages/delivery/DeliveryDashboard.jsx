import BottomNav from "../../components/ui/BottomNav";

export default function DeliveryDashboard() {
  const activeOrder = {
    id: "DWA-002",
    customer: "Sameer Khan",
    address: "Karan Nagar, Srinagar",
    phone: "+91 9876543210",
    total: 320,
    status: "On the way",
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header */}
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold">Delivery Dashboard</h1>
      </div>

      {/* Active Delivery */}
      <div className="px-4 mt-4">
        <h2 className="text-lg font-semibold mb-2">Active Delivery</h2>

        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Order: {activeOrder.id}</h3>
              <p className="text-sm text-gray-500">{activeOrder.address}</p>
              <p className="text-sm text-gray-500">Customer: {activeOrder.customer}</p>
            </div>

            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold h-fit">
              {activeOrder.status}
            </span>
          </div>

          <p className="font-bold mt-3 text-gray-700">₹{activeOrder.total}</p>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-3">
            <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg shadow active:scale-95">
              Navigate
            </button>

            <button className="flex-1 py-3 bg-green-600 text-white rounded-lg shadow active:scale-95">
              Mark Delivered
            </button>
          </div>

          {/* Call Customer */}
          <button className="w-full mt-3 py-3 bg-gray-100 text-gray-700 rounded-lg shadow active:scale-95">
            Call Customer
          </button>
        </div>
      </div>

      {/* Previous Deliveries */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold mb-2">Previous Deliveries</h2>

        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="font-semibold">DWA-001</p>
            <p className="text-sm text-gray-500">Delivered</p>
          </div>
          <p className="font-bold">₹450</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
