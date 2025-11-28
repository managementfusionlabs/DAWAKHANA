import BottomNav from "../../components/ui/BottomNav";

export default function DeliveryOrderDetails() {
  const order = {
    id: "DWA-002",
    customer: "Sameer Khan",
    phone: "+91 9876543210",
    address: "Karan Nagar, Srinagar",
    total: 320,
    status: "On the way",
    items: [
      { name: "Paracetamol 500mg", qty: 1, price: 30 },
      { name: "Cough Syrup 100ml", qty: 1, price: 90 },
      { name: "Antibiotic Tablets", qty: 1, price: 200 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header */}
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold">Order Details</h1>
      </div>

      <div className="px-4 mt-4 flex flex-col gap-5">

        {/* Order Info */}
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="font-semibold text-gray-800 text-lg">Order: {order.id}</p>

          <div className="mt-3">
            <p className="text-gray-600">Customer: {order.customer}</p>
            <p className="text-gray-600">Phone: {order.phone}</p>
            <p className="text-gray-600">Address: {order.address}</p>

            <span
              className={`px-3 py-1 mt-3 inline-block rounded-full text-xs font-semibold
                ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }
              `}
            >
              {order.status}
            </span>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-gray-200 rounded-xl h-48 flex items-center justify-center text-gray-600 text-sm">
          Map View (Coming Soon)
        </div>

        {/* Items List */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Items</h2>

          <div className="flex flex-col gap-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <p>{item.name} (x{item.qty})</p>
                <p className="font-semibold">₹{item.price}</p>
              </div>
            ))}
          </div>

          <div className="border-t mt-3 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg shadow active:scale-95">
            Navigate
          </button>

          <button className="flex-1 py-3 bg-green-600 text-white rounded-lg shadow active:scale-95">
            Mark Delivered
          </button>
        </div>

        <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg shadow active:scale-95">
          Call Customer
        </button>

      </div>

      <BottomNav />
    </div>
  );
}
