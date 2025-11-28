// src/pages/pharmacy/AddMedicine.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../components/layout/MainLayout";
import GlassCard from "../../components/ui/GlassCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import { useNavigate } from "react-router-dom";

export default function AddMedicine() {
  const navigate = useNavigate();

  const [medicineList, setMedicineList] = useState([]);
  const [form, setForm] = useState({
    medicineId: "",
    price: "",
    stock: "",
    expireDate: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("/api/medicines", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setMedicineList(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setMedicineList([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.medicineId) return alert("Select a medicine");

    try {
      setLoading(true);

      await axios.post(
        "/api/inventory/add",
        {
          medicineId: form.medicineId,
          stock: Number(form.stock),
          price: Number(form.price),
          expireDate: form.expireDate || null,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      alert("Medicine added to inventory");
      navigate("/pharmacy/inventory");
    } catch (err) {
      console.error(err);
      alert("Failed to add medicine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Add Medicine to Inventory
      </h1>

      <GlassCard className="max-w-3xl mx-auto p-10 backdrop-blur-xl bg-white/50 shadow-2xl border border-white/40 rounded-3xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

          {/* MEDICINE DROPDOWN */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700 text-lg">
              Select Medicine
            </label>

            <select
              name="medicineId"
              value={form.medicineId}
              onChange={handleChange}
              className="p-4 rounded-xl bg-white/70 text-gray-800 shadow-inner border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="" className="text-gray-600">
                -- Choose a medicine --
              </option>

              {medicineList.map((m) => (
                <option
                  key={m._id}
                  value={m._id}
                  className="text-gray-900 bg-white"
                >
                  {m.name}
                  {m.form ? ` — ${m.form}` : ""}
                  {m.category ? ` — ${m.category}` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* PRICE & STOCK */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">Price (₹)</label>
              <Input
                name="price"
                type="number"
                placeholder="Enter price"
                value={form.price}
                onChange={handleChange}
                className="bg-white/70 text-gray-800 p-4 rounded-xl shadow-inner border border-gray-300"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">Stock</label>
              <Input
                name="stock"
                type="number"
                placeholder="Enter quantity"
                value={form.stock}
                onChange={handleChange}
                className="bg-white/70 text-gray-800 p-4 rounded-xl shadow-inner border border-gray-300"
              />
            </div>
          </div>

          {/* EXPIRY DATE */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Expiry Date</label>
            <Input
              name="expireDate"
              type="date"
              value={form.expireDate}
              onChange={handleChange}
              className="bg-white/70 text-gray-800 p-4 rounded-xl shadow-inner border border-gray-300"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 py-4 text-lg rounded-xl"
              disabled={loading}
            >
              {loading ? "Saving…" : "Add to Inventory"}
            </Button>

            <button
              type="button"
              onClick={() => navigate("/pharmacy/inventory")}
              className="py-4 px-8 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 text-gray-700 shadow hover:bg-white/50 transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </GlassCard>
    </MainLayout>
  );
}
