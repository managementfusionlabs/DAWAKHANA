import { BrowserRouter, Routes, Route } from "react-router-dom";



// DASHBOARDS
import CustomerHome from "./pages/customer/CustomerHome";
import PharmacyDashboard from "./pages/pharmacy/PharmacyDashboard";
import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";


// export default function App() {
//   return (<div className="text-4xl font-bold text-blue-500">
//   Tailwind is now alive 🔥
// </div>
//   );}
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth */}
        <h1 className="text-4xl text-red-500">Tailwind Working!</h1>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Customer */}
        <Route path="/customer/home" element={<CustomerHome />} />
        <Route path="/customer/orders" element={<CustomerOrders />} />

        {/* Pharmacy */}
        <Route path="/pharmacy/dashboard" element={<PharmacyDashboard />} />

        {/* Delivery */}
        <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
