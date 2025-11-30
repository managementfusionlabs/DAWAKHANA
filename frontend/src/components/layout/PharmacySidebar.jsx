// src/components/sidebar/PharmacySidebar.jsx
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import GlassCard from "../ui/GlassCard";

export default function PharmacySidebar() {
  const navigate = useNavigate();

  return (
    <GlassCard >
      <h2 className="text-2xl font-bold text-amber-600 mb-8 px-2">Dawakhana</h2>

      <div className="flex flex-col gap-3">

        <Button
          onClick={() => navigate("/pharmacy/dashboard")}>
          Dashboard
        </Button>

        <Button
          onClick={() => navigate("/pharmacy/inventory")}>Inventory
          </Button>

        <Button
          onClick={() => navigate("/pharmacy/orders")}
          // className="text-left px-4 py-3 bg-white/20 text-green-400 font-bold hover:bg-white/30 transition rounded-xl"
        >
          Orders
        </Button>

        {/* FIXED: Correct Add Medicine Route */}
        <Button
          onClick={() => navigate("/pharmacy/medicines/create")}>
          Create Medicine
        </Button>
        <Button onClick={() => navigate("/pharmacy/assign-agent")}>
          Assign Agent
        </Button>


        <Button 
          onClick={() => navigate("/pharmacy/profile")}        >
          Profile
        </Button>

      </div>
    </GlassCard>
  );
}
