import Sidebar from "../ui/Sidebar";
import Navbar from "../ui/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar (Desktop only) */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        
        <Navbar />
        
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
