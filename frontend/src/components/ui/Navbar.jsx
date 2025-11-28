export default function Navbar() {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold text-gray-700">Dashboard</h2>

      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        Logout
      </button>
    </div>
  );
}
