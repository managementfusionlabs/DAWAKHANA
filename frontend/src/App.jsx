import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";


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
import AssignAgentList from "./pages/pharmacy/AssignAgentList";
import AssignAgentDetails from "./pages/pharmacy/AssignAgentDetails";
import DeliveryOrderDetailsPage from "./pages/delivery/DeliveryOrderDetails";


function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Login />} />
<Route path="/signup" element={<Signup />} />


{/* Customer */}
<Route path="/customer/home" element={<ProtectedRoute role={"customer"}><CustomerHome /></ProtectedRoute>} />
<Route path="/customer/orders" element={<ProtectedRoute role={"customer"}><CustomerOrders /></ProtectedRoute>} />
<Route path="/customer/cart" element={<ProtectedRoute role={"customer"}><CustomerCart /></ProtectedRoute>} />
<Route path="/customer/profile" element={<ProtectedRoute role={"customer"}><CustomerProfile /></ProtectedRoute>} />


{/* Pharmacy */}
<Route path="/pharmacy/dashboard" element={<ProtectedRoute role={"pharmacy"}><PharmacyDashboard /></ProtectedRoute>} />
<Route path="/pharmacy/orders" element={<ProtectedRoute role={"pharmacy"}><PharmacyOrders /></ProtectedRoute>} />
<Route path="/pharmacy/orders/:id" element={<ProtectedRoute role={"pharmacy"}><PharmacyOrderDetails /></ProtectedRoute>} />
<Route path="/pharmacy/inventory" element={<ProtectedRoute role={"pharmacy"}><PharmacyInventory /></ProtectedRoute>} />
<Route path="/pharmacy/add-medicine" element={<ProtectedRoute role={"pharmacy"}><AddMedicine /></ProtectedRoute>} />
<Route path="/pharmacy/medicine/:id/edit" element={<ProtectedRoute role={"pharmacy"}><EditMedicine /></ProtectedRoute>} />
<Route path="/pharmacy/medicines/create" element={<ProtectedRoute role={"pharmacy"}><CreateMedicine /></ProtectedRoute>} />
<Route path="/pharmacy/assign-agent" element={<ProtectedRoute role={"pharmacy"}><AssignAgentList /></ProtectedRoute>} />
<Route path="/pharmacy/assign-agent/:id" element={<ProtectedRoute role={"pharmacy"}><AssignAgentDetails /></ProtectedRoute>} />


{/* Delivery */}
<Route path="/delivery/dashboard" element={<ProtectedRoute role={"delivery"}><DeliveryDashboard /></ProtectedRoute>} />
<Route path="/delivery/order/:id" element={<ProtectedRoute role={"delivery"}><DeliveryOrderDetails /></ProtectedRoute>} />
<Route path="/delivery/history" element={<ProtectedRoute role={"delivery"}><DeliveryHistory /></ProtectedRoute>} />
<Route path="/delivery/profile" element={<ProtectedRoute role={"delivery"}><DeliveryProfile /></ProtectedRoute>} />


{/* Admin */}
<Route path="/admin/dashboard" element={<ProtectedRoute role={"admin"}><AdminDashboard /></ProtectedRoute>} />
<Route path="/admin/pharmacies" element={<ProtectedRoute role={"admin"}><AdminPharmacies /></ProtectedRoute>} />
<Route path="/admin/customers" element={<ProtectedRoute role={"admin"}><AdminCustomers /></ProtectedRoute>} />
<Route path="/admin/delivery-agents" element={<ProtectedRoute role={"admin"}><AdminDeliveryAgents /></ProtectedRoute>} />
<Route path="/admin/orders" element={<ProtectedRoute role={"admin"}><AdminOrders /></ProtectedRoute>} />
<Route path="/admin/pharmacies/:id" element={<ProtectedRoute role={"admin"}><AdminPharmacyDetails /></ProtectedRoute>} />


</Routes>
</BrowserRouter>
);
}


export default App;