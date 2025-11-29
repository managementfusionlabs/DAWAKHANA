import { BrowserRouter, Routes, Route } from "react-router-dom";


// DASHBOARDS
import CustomerHome from "./pages/customer/CustomerHome";
import PharmacyDashboard from "./pages/pharmacy/PharmacyDashboard";
import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import CustomerOrders from "./pages/customer/CustomerOrders";
import CustomerCart from "./pages/customer/CustomerCart";
import CustomerProfile from "./pages/customer/CustomerProfile";
import PharmacyOrders from "./pages/pharmacy/PharmacyOrders";
import PharmacyOrderDetails from "./pages/pharmacy/PharmacyOrderDetails";
import PharmacyInventory from "./pages/pharmacy/PharmacyInventory";
import AddMedicine from "./pages/pharmacy/AddMedicine";
import EditMedicine from "./pages/pharmacy/EditMedicine";
import DeliveryOrderDetails from "./pages/delivery/DeliveryOrderDetails";
import DeliveryHistory from "./pages/delivery/DeliveryHistory";
import DeliveryProfile from "./pages/delivery/DeliveryProfile";
import AdminPharmacies from "./pages/admin/AdminPharmacies";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminDeliveryAgents from "./pages/admin/AdminDeliveryAgents";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminPharmacyDetails from "./pages/admin/AdminPharmacyDetails";
import CreateMedicine from "./pages/pharmacy/CreateMedicine";
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
        {/* <h1 className="text-4xl text-red-500">Tailwind Working!</h1> */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Customer */}
        <Route path="/customer/home" element={<CustomerHome />} />
        <Route path="/customer/orders" element={<CustomerOrders />} />
        <Route path="/customer/cart" element={<CustomerCart />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />

        {/* Pharmacy */}
        <Route path="/pharmacy/dashboard" element={<PharmacyDashboard />} />
        <Route path="/pharmacy/orders" element={<PharmacyOrders />} />
        <Route path="/pharmacy/orders/:id" element={<PharmacyOrderDetails />} />
        <Route path="/pharmacy/inventory" element={<PharmacyInventory />} />
        <Route path="/pharmacy/add-medicine" element={<AddMedicine />} />
        <Route path="/pharmacy/medicine/:id/edit" element={<EditMedicine />} />
        <Route path="/pharmacy/medicines/create" element={<CreateMedicine />} />

        {/* <Route path="/pharmacy/profile" element={<PharmacyProfile />} /> */}


        {/* Delivery */}
        <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
        <Route path="/delivery/order/:id" element={<DeliveryOrderDetails />} />
        <Route path="/delivery/history" element={<DeliveryHistory />} />
        <Route path="/delivery/profile" element={<DeliveryProfile />} />
        
        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/pharmacies" element={<AdminPharmacies />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/delivery-agents" element={<AdminDeliveryAgents />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/pharmacies/:id" element={<AdminPharmacyDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
