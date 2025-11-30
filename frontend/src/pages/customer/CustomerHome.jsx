import { useEffect, useState } from "react";
import axios from "../../api/axios";
import BottomNav from "../../components/ui/BottomNav";
import { addToCart } from "../../utils/Cart";

export default function CustomerHome() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/customer/medicines").then((res) => {
      setItems(res.data || []);
    });
  }, []);

  const filtered = items.filter((i) =>
    i.medicine?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold">Dawakhana</h1>
        <input
          type="text"
          placeholder="Search medicines..."
          className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Medicines */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold mb-3">Available Medicines</h2>

        <div className="flex flex-col gap-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{item.medicine?.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.medicine?.form || "—"}
                </p>
                <p className="font-semibold mt-1">₹{item.price}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.pharmacy?.storeName}
                </p>
              </div>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                onClick={() => {
                  addToCart({
                    inventoryId: item._id,
                    medicineId: item.medicine?._id,
                    medicineName: item.medicine?.name,
                    price: item.price,
                    qty: 1,
                    pharmacyId: item.pharmacy?._id,
                  });

                  window.dispatchEvent(new Event("cartUpdated"));
                  alert("Added to cart!");
                }}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
