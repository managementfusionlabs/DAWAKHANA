import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// UI Components
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import GlassCard from "../../components/ui/GlassCard";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        phone,
        password,
      });

      const { token, role } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "customer") navigate("/customer/home");
      if (role === "pharmacy") navigate("/pharmacy/dashboard");
      if (role === "delivery") navigate("/delivery/dashboard");
      if (role === "admin") navigate("/admin/dashboard");

    } catch (err) {
      alert("Invalid phone or password");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('/dawakhana-bg1.png')` }}
    >
      {/* subtle dim + blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      {/* center container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">

        {/* Glass Card */}
        <GlassCard className="w-full max-w-md">

          <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
            Login
          </h2>

          <div className="flex flex-col gap-4 text-white">

            <Input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handleLogin}>Login</Button>

          </div>

          <p className="text-center text-white/80 mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="cursor-pointer font-semibold text-white hover:text-blue-200"
            >
              Signup
            </span>
          </p>

        </GlassCard>

      </div>
    </div>
  );
}
