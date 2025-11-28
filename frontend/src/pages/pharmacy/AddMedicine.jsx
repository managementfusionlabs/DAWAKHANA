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
    // fetch master medicines (backend should expose GET /api/medicines)
    axios
      .get("/api/medicines")
      .then((res) => setMedicineList(res.data))
      .catch((err) => {
        console.log("Failed to fetch medicines", err);
        setMedicineList([]);
      });
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
        "/api/inventory",
        {
          medicineId: form.medicineId,
          stock: Number(form.stock),
          price: Number(form.price),
          expireDate: form.expireDate || null,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
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
      <h1 className="text-3xl font-bold mb-6">Add Medicine to Inventory</h1>

      <GlassCard className="max-w-3xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="font-semibold text-white">Medicine</label>
          <Select
            name="medicineId"
            value={form.medicineId}
            onChange={handleChange}
            className="text-black"
          >
            <option value="">-- Select medicine --</option>
            {medicineList.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name} {m.brand ? `— ${m.brand}` : ""}
              </option>
            ))}
          </Select>

          <div className="grid grid-cols-2 gap-4">
            <Input
              name="price"
              type="number"
              placeholder="Price (₹)"
              value={form.price}
              onChange={handleChange}
            />
            <Input
              name="stock"
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
            />
          </div>

          <Input
            name="expireDate"
            type="date"
            placeholder="Expire date (optional)"
            value={form.expireDate}
            onChange={handleChange}
          />

          <div className="flex gap-3">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Saving..." : "Add to Inventory"}
            </Button>

            <button
              type="button"
              onClick={() => navigate("/pharmacy/inventory")}
              className="py-3 px-6 rounded-xl bg-white/10 text-white border border-white/20"
            >
              Cancel
            </button>
          </div>
        </form>
      </GlassCard>
    </MainLayout>
  );
}
