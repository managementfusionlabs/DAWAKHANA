import BottomNav from "../../components/ui/BottomNav";

export default function CustomerCart() {
  const cartItems = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      qty: 1,
      price: 30,
    },
    {
      id: 2,
      name: "Cough Syrup 100ml",
      qty: 2,
      price: 80,
    },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold">Your Cart</h1>
      </div>

      {/* Cart Items */}
      <div className="px-4 mt-4 flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-gray-700">{item.name}</h3>
              <p className="text-sm text-gray-500">Qty: {item.qty}</p>
              <p className="font-bold mt-1">₹{item.price * item.qty}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded-full text-lg">
                –
              </button>
              <span className="text-lg">{item.qty}</span>
              <button className="w-7 h-7 flex items-center justify-center bg-blue-600 text-white rounded-full text-lg">
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Bar */}
      <div className="fixed bottom-14 left-0 w-full bg-white p-4 shadow-xl flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Total</p>
          <p classname="text-xl font-bold">₹{total}</p>
        </div>

        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md active:scale-95 transition">
          Checkout
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
