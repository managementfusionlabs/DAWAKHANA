import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        phone,
        email,
        password,
        role,
        details: {},
      });

      alert("Signup successful! Login now.");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <div className="flex flex-col gap-4">
          <input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />

          <input
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
          >
            <option value="customer">Customer</option>
            <option value="pharmacy">Pharmacy Seller</option>
            <option value="delivery">Delivery Agent</option>
          </select>

          <button
            onClick={handleSignup}
            className="w-full py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            Create Account
          </button>

          <p className="text-center text-gray-600 mt-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
