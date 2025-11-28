import MainLayout from "../../components/layout/MainLayout";
import { useState } from "react";

export default function AddMedicine() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Medicine Submitted:", form);
    // Later: send this to backend using axios
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Add New Medicine</h1>

      <div className="bg-white p-8 rounded-xl shadow max-w-3xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Name */}
          <div>
            <label className="font-semibold">Medicine Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
              placeholder="e.g. Paracetamol 500mg"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
            >
              <option value="">Select Category</option>
              <option value="Tablet">Tablet</option>
              <option value="Syrup">Syrup</option>
              <option value="Gel">Gel</option>
              <option value="Drops">Drops</option>
              <option value="Injection">Injection</option>
            </select>
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="font-semibold">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
                placeholder="e.g. 80"
              />
            </div>

            <div>
              <label className="font-semibold">Stock</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
                placeholder="e.g. 100"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50 h-28"
              placeholder="Enter short description of medicine"
            />
          </div>

          {/* Image */}
          <div>
            <label className="font-semibold">Medicine Image (optional)</label>
            <input
              type="file"
              name="image"
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl shadow active:scale-95 transition"
          >
            Save Medicine
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
