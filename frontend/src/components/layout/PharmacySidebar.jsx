// src/components/sidebar/PharmacySidebar.jsx
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import GlassCard from "../ui/GlassCard";

export default function PharmacySidebar() {
  const navigate = useNavigate();

  return (
    <GlassCard className="w-64 min-h-screen p-4 bg-white/10 backdrop-blur-xl border-r border-white/10 shadow-xl">
      <h2 className="text-2xl font-bold text-amber-600 mb-8 px-2">Dawakhana</h2>

      <div className="flex flex-col gap-3">

        <Button
          onClick={() => navigate("/pharmacy/dashboard")}
          className="text-left px-4 py-3 bg-white/20 text-white hover:bg-white/30 transition rounded-xl"
        >
          Dashboard
        </Button>

        <Button
          onClick={() => navigate("/pharmacy/inventory")}
          className="text-left px-4 py-3 bg-white/20 text-white hover:bg-white/30 transition rounded-xl"
        >
          Inventory
        </Button>

        <Button
          onClick={() => navigate("/pharmacy/orders")}
          className="text-left px-4 py-3 bg-white/20 text-white hover:bg-white/30 transition rounded-xl"
        >
          Orders
        </Button>

        <Button 
          onClick={() => navigate(`/pharmacy/inventory/edit/${m._id}`)}
          className="text-left px-4 py-3 bg-white/20 text-white hover:bg-white/30 transition rounded-xl"
        >
          Add Medicine
        </Button>

        <Button 
          onClick={() => navigate("/pharmacy/profile")}
          className="text-left px-4 py-3 bg-white/20 text-white hover:bg-white/30 transition rounded-xl"
        >
          Profile
        </Button>

      </div>
    </GlassCard>
  );
}
