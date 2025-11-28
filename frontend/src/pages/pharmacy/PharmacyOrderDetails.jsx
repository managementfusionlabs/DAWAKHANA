import MainLayout from "../../components/layout/MainLayout";

export default function PharmacyOrderDetails() {
  const order = {
    id: "ORD-101",
    customer: "Sameer Khan",
    address: "Karan Nagar, Srinagar",
    phone: "+91 9876543210",
    total: 350,
    status: "Pending",
    items: [
      { name: "Paracetamol 500mg", qty: 1, price: 30 },
      { name: "Cough Syrup 100ml", qty: 1, price: 90 },
      { name: "Antibiotic Tablets", qty: 1, price: 230 },
    ],
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      {/* Top Info Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xl font-semibold">Order: {order.id}</p>
            <p className="text-gray-600 mt-1">
              Customer: <span className="font-medium">{order.customer}</span>
            </p>
            <p className="text-gray-600">Address: {order.address}</p>
            <p className="text-gray-600">Phone: {order.phone}</p>
          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              order.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : order.status === "Packed"
                ? "bg-blue-100 text-blue-700"
                : order.status === "Ready"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Items Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Items</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Medicine</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="py-3">{item.name}</td>
                <td>{item.qty}</td>
                <td>₹{item.price}</td>
                <td className="font-semibold">₹{item.price * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="flex justify-end font-bold text-lg mt-4">
          Total: ₹{order.total}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow active:scale-95 transition">
          Mark as Packed
        </button>

        <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow active:scale-95 transition">
          Mark as Ready
        </button>

        <button className="px-6 py-3 bg-gray-700 text-white rounded-lg shadow active:scale-95 transition">
          Assign Delivery
        </button>
      </div>
    </MainLayout>
  );
}
