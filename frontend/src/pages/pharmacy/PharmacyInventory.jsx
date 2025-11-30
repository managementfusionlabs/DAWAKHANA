// src/pages/pharmacy/PharmacyInventory.jsx
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import MainLayout from "../../components/layout/MainLayout";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function PharmacyInventory() {
  const [meds, setMeds] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchInventory = () => {
axios.get("/inventory/list", {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
})
  .then((res) => {
    console.log("INVENTORY RESPONSE:", res.data);

    if (Array.isArray(res.data)) {
      setMeds(res.data);
    } else if (Array.isArray(res.data.items)) {
      setMeds(res.data.items);
    } else if (Array.isArray(res.data.inventory)) {
      setMeds(res.data.inventory);
    } else {
      console.warn("Unexpected inventory format, defaulting to []");
      setMeds([]);
    }
  })
  .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this inventory item?")) return;
    try {
     axios.delete(`/inventory/delete/${id}`, {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
})

      fetchInventory();
      alert("Deleted");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const filtered = meds.filter((m) => {
    const cat = m.medicine?.category || "";
    const name = m.medicine?.name || "";
    if (filter !== "All" && cat !== filter) return false;
    if (search && !name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <div className="flex gap-3">
          <Button onClick={() => navigate("/pharmacy/add-medicine")}>+ Add Medicine</Button>
        </div>
      </div>

      <GlassCard>
        <div className="flex justify-between mb-4">
          <div className="flex gap-3">
            {["All", "Tablet", "Syrup", "Gel", "Drops", "Injection"].map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-lg border transition ${
                  filter === c ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicine..."
            className="p-2 border rounded-xl"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Expire</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((m) => (
                <tr key={m._id} className="border-b">
                  <td className="py-3">{m._id}</td>
                  <td>{m.medicine?.name ?? "—"}</td>
                  <td>{m.medicine?.category ?? "—"}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        m.stock < 10 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {m.stock}
                    </span>
                  </td>
                  <td>₹{m.price}</td>
                  <td>{m.expireDate ? new Date(m.expireDate).toLocaleDateString() : "—"}</td>
                  <td className="flex gap-3">
                    <button
                      onClick={() => navigate(`/pharmacy/medicine/${m._id}/edit`)
}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(m._id)} className="text-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && <p className="text-center py-6 text-gray-500">No items.</p>}
        </div>
      </GlassCard>
    </MainLayout>
  );
}
