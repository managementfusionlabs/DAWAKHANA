import { useState } from "react";
import axios from "axios";
import MainLayout from "../../components/layout/MainLayout";
import GlassCard from "../../components/ui/GlassCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function CreateMedicine() {
  const [form, setForm] = useState({
    name: "",
    genericName: "",
    brand: "",
    category: "",
    form: "",
    description: "",
    requiresPrescription: false,
  });

  const types = [
    "Tablet",
    "Capsule",
    "Syrup",
    "Suspension",
    "Injection",
    "Drops",
    "Gel",
    "Ointment",
    "Cream",
    "Spray",
    "Lotion",
    "Inhaler",
  ];

  const update = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "/api/pharmacy/medicines/create",
        form,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      alert("Medicine Created Successfully");

      setForm({
        name: "",
        genericName: "",
        brand: "",
        category: "",
        form: "",
        description: "",
        requiresPrescription: false,
      });
    } catch (err) {
      console.log(err);
      alert("Creation failed");
    }
  };

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Create Medicine
      </h1>

      <GlassCard className="max-w-3xl mx-auto p-10 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40">

        <form onSubmit={submit} className="flex flex-col gap-8">

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Name*</label>
            <Input
              name="name"
              required
              placeholder="Paracetamol"
              className="bg-white/70 text-gray-900 rounded-xl p-4"
              value={form.name}
              onChange={update}
            />
          </div>

          {/* Generic + Brand */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-gray-700">Generic</label>
              <Input
                name="genericName"
                placeholder="Acetaminophen"
                className="bg-white/70 text-gray-900 rounded-xl p-4"
                value={form.genericName}
                onChange={update}
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Brand</label>
              <Input
                name="brand"
                placeholder="Crocin"
                className="bg-white/70 text-gray-900 rounded-xl p-4"
                value={form.brand}
                onChange={update}
              />
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Category</label>
            <Input
              name="category"
              placeholder="Painkiller / Antibiotic / etc"
              className="bg-white/70 text-gray-900 rounded-xl p-4"
              value={form.category}
              onChange={update}
            />
          </div>

          {/* Type / Form */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Type / Form*</label>

            <select
              name="form"
              required
              value={form.form}
              onChange={update}
              className="p-4 rounded-xl bg-white/70 text-gray-900 shadow-inner border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Type --</option>

              {types.map((t) => (
                <option key={t} value={t} className="text-gray-900">
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Short description..."
              className="p-4 bg-white/70 text-gray-900 rounded-xl border border-gray-300"
              value={form.description}
              onChange={update}
            />
          </div>

          {/* Prescription */}
          <label className="flex items-center gap-3 font-semibold text-gray-700">
            <input
              type="checkbox"
              checked={form.requiresPrescription}
              onChange={(e) =>
                setForm((p) => ({ ...p, requiresPrescription: e.target.checked }))
              }
              className="w-5 h-5 accent-blue-500"
            />
            Requires Prescription
          </label>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1 py-4 text-lg rounded-xl">
              Create Medicine
            </Button>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="py-4 px-8 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 text-gray-700 shadow hover:bg-white/50"
            >
              Cancel
            </button>
          </div>

        </form>

      </GlassCard>
    </MainLayout>
  );
}
