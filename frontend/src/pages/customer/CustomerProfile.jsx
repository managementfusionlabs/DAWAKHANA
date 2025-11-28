import BottomNav from "../../components/ui/BottomNav";

export default function CustomerProfile() {
  const user = {
    name: "John Doe",
    phone: "+91 9876543210",
    email: "john@example.com",
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold">Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="px-4 mt-6">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <div className="w-20 h-20 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold">
            {user.name[0]}
          </div>

          <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <p className="text-gray-500">{user.phone}</p>
        </div>
      </div>

      {/* Options */}
      <div className="px-4 mt-6 flex flex-col gap-3">
        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <span>Manage Addresses</span>
          <span className="text-gray-500">{">"}</span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <span>Order History</span>
          <span className="text-gray-500">{">"}</span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <span>Help & Support</span>
          <span className="text-gray-500">{">"}</span>
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 mt-8">
        <button className="w-full py-3 bg-red-500 text-white rounded-lg shadow-md active:scale-95 transition">
          Logout
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
