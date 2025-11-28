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
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        phone,
        email,
        password,
        role,
        details: {},   // keep blank for now
      });

      alert("Signup successful! Login now.");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Signup</h2>

      <input
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br /><br />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      /><br /><br />

      <input
        placeholder="Email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <label>Select Role:</label><br />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="customer">Customer</option>
        <option value="pharmacy">Pharmacy Seller</option>
        <option value="delivery">Delivery Agent</option>
      </select>

      <br /><br />

      <button onClick={handleSignup}>Create Account</button>

      <p style={{ marginTop: 10 }}>
        Already have an account?{" "}
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => navigate("/")}
        >
          Login
        </span>
      </p>
    </div>
  );
}
