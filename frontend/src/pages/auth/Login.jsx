import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        phone,
        password
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <div className="flex flex-col gap-4">
          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center text-gray-600 mt-2">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Signup
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
