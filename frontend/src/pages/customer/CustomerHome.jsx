import BottomNav from "../../components/ui/BottomNav";

export default function CustomerHome() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Top Bar */}
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold">Dawakhana</h1>
        <input
          type="text"
          placeholder="Search medicines..."
          className="w-full mt-3 p-3 border rounded-xl bg-gray-100 focus:outline-none"
        />
      </div>

      {/* Categories */}
      <div className="px-4 mt-4">
        <h2 className="text-lg font-semibold mb-3">Categories</h2>
        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-white shadow rounded-xl text-sm">Tablets</div>
          <div className="p-3 bg-white shadow rounded-xl text-sm">Syrups</div>
          <div className="p-3 bg-white shadow rounded-xl text-sm">First Aid</div>
          <div className="p-3 bg-white shadow rounded-xl text-sm">Vitamins</div>
        </div>
      </div>

      {/* Medicine List */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold mb-3">Popular Medicines</h2>

        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white shadow p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">Paracetamol 500mg</h3>
                <p className="text-sm text-gray-500">Strip of 10 tablets</p>
                <p className="font-semibold mt-1">₹30</p>
              </div>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      <button className="fixed bottom-20 right-5 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg">
        Cart (0)
      </button>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
