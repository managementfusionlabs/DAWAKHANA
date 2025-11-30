// src/pages/pharmacy/EditMedicine.jsx
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import MainLayout from "../../components/layout/MainLayout";
import GlassCard from "../../components/ui/GlassCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useParams, useNavigate } from "react-router-dom";

export default function EditMedicine() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    stock: "",
    price: "",
    expireDate: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!itemId) return;
    axios
      .get(`/inventory/${itemId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const it = res.data;
        setForm({
          stock: it.stock ?? "",
          price: it.price ?? "",
          expireDate: it.expireDate ? it.expireDate.split("T")[0] : "",
        });
      })
      .catch((err) => {
        console.error("Failed to load inventory item:", err);
        alert("Failed to load item");
      });
  }, [itemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(
        `/inventory/${itemId}`,
        {
          stock: Number(form.stock),
          price: Number(form.price),
          expireDate: form.expireDate || null,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Inventory updated");
      navigate("/pharmacy/inventory");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Edit Inventory Item</h1>

      <GlassCard className="max-w-3xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          <Input
            name="expireDate"
            type="date"
            value={form.expireDate}
            onChange={handleChange}
          />

          <div className="flex gap-3">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
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
