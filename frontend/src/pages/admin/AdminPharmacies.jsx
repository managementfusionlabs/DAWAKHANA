import MainLayout from "../../components/layout/MainLayout";

export default function AdminPharmacies() {
  const pharmacies = [
    {
      id: "PHM-001",
      name: "GreenLife Pharmacy",
      owner: "Adil Lone",
      address: "Rajbagh, Srinagar",
      status: "Active",
    },
    {
      id: "PHM-002",
      name: "HealthPlus Medical Store",
      owner: "Mehreen Akhtar",
      address: "Nowgam, Srinagar",
      status: "Suspended",
    },
    {
      id: "PHM-003",
      name: "CityMed Pharmacy",
      owner: "Aamir Mir",
      address: "Lal Chowk, Srinagar",
      status: "Pending",
    },
  ];

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pharmacies</h1>

        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow">
          + Add Pharmacy
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search pharmacy..."
          className="w-full p-3 border rounded-xl bg-gray-50"
        />
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">ID</th>
              <th>Name</th>
              <th>Owner</th>
              <th>Address</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {pharmacies.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="py-3">{p.id}</td>
                <td>{p.name}</td>
                <td>{p.owner}</td>
                <td>{p.address}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      p.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : p.status === "Suspended"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td className="flex gap-3">
                  <button className="text-blue-600">Edit</button>
                  <button className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pharmacies.length === 0 && (
          <p className="text-center text-gray-500 py-6">No pharmacies found.</p>
        )}
      </div>
    </MainLayout>
  );
}
