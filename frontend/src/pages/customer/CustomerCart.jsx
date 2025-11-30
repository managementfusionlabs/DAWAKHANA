import { useEffect, useState } from "react";
import BottomNav from "../../components/ui/BottomNav";
import { getCart, updateQty, removeFromCart } from "../../utils/Cart";
import axios from "../../api/axios";

export default function CustomerCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const changeQty = (id, qty) => {
    if (qty < 1) return;
    setCart(updateQty(id, qty));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    setCart(removeFromCart(id));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const checkout = async () => {
    if (cart.length === 0) return alert("Cart is empty");

    // backend expects ONE pharmacy per order
    const pharmacies = [...new Set(cart.map((i) => i.pharmacyId))];

    if (pharmacies.length > 1) {
      return alert("You can only order from one pharmacy at a time.");
    }

    const payload = {
      pharmacyId: pharmacies[0], // required in backend
      items: cart.map((i) => ({
        medicineId: i.medicineId,
        quantity: i.qty, // FIXED
        price: i.price,
      })),

      // Until address UI is added, send dummy address
      address: {
        addressLine: "Street 1",
        city: "Srinagar",
        state: "JK",
        pincode: "190001",
      },
    };

    try {
      await axios.post("/order/create", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      window.location.href = "/customer/orders";
    } catch (err) {
      console.log("ORDER ERROR:", err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold">Your Cart</h1>
      </div>

      {/* Cart Items */}
      <div className="px-4 mt-4 flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.inventoryId}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{item.medicineName}</h3>
              <p className="font-bold mt-1">₹{item.price * item.qty}</p>
            </div>

            {/* Qty Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => changeQty(item.inventoryId, item.qty - 1)}
                className="w-7 h-7 bg-gray-200 rounded-full text-lg"
              >
                –
              </button>

              <span>{item.qty}</span>

              <button
                onClick={() => changeQty(item.inventoryId, item.qty + 1)}
                className="w-7 h-7 bg-blue-600 text-white rounded-full text-lg"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.inventoryId)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Checkout Bar */}
      <div className="fixed bottom-14 left-0 w-full bg-white p-4 shadow-xl flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-xl font-bold">₹{total}</p>
        </div>

        <button
          onClick={checkout}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md active:scale-95 transition"
        >
          Checkout
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
