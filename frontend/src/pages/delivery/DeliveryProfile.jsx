import BottomNav from "../../components/ui/BottomNav";

export default function DeliveryProfile() {
  const rider = {
    name: "Adil Lone",
    phone: "+91 9876543210",
    email: "adil.rider@example.com",
    id: "RDR-102",
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
            {rider.name[0]}
          </div>

          <h2 className="text-xl font-semibold mt-4">{rider.name}</h2>
          <p className="text-gray-500 text-sm">{rider.email}</p>
          <p className="text-gray-500">{rider.phone}</p>

          <p className="text-sm mt-2 text-gray-400">Rider ID: {rider.id}</p>
        </div>
      </div>

      {/* Options */}
      <div className="px-4 mt-6 flex flex-col gap-3">
        
        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <span>Completed Deliveries</span>
          <span className="text-gray-500">{">"}</span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <span>Earnings Summary</span>
          <span className="text-gray-500">{">"}</span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <span>Support</span>
          <span className="text-gray-500">{">"}</span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <span>Settings</span>
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
