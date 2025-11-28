import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import PharmacySidebar from "./PharmacySidebar";
// import CustomerSidebar from "../sidebars/CustomerSidebar";
// import DeliverySidebar from "../sidebars/DeliverySidebar";
export default function MainLayout({ children }) {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR - role based */}
    
      {role === "admin" && <AdminSidebar />}
      {role === "pharmacy" && <PharmacySidebar />}
      {role === "customer" && <CustomerSidebar />}
      {role === "delivery" && <DeliverySidebar />}

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
