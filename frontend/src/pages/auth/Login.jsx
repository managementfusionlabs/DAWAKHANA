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
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>

      <p style={{ marginTop: 10 }}>
        Don’t have an account?{" "}
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => navigate("/signup")}
        >
          Signup
        </span>
      </p>
    </div>
  );
}
