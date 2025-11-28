export default function AdminSidebar() {
  return (
    <div className="w-64 bg-white shadow p-4">
      <h2 className="font-bold text-xl mb-4">Admin Dashboard</h2>

      <ul className="space-y-3">
        <li>Pharmacies</li>
        <li>Customers</li>
        <li>Delivery Agents</li>
        <li>Orders</li>
      </ul>
    </div>
  );
}
