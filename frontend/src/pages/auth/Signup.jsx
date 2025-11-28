import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// UI components
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import GlassCard from "../../components/ui/GlassCard";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  // Dynamic role-based fields
  const [customerAddress, setCustomerAddress] = useState({
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const [pharmacyDetails, setPharmacyDetails] = useState({
    storeName: "",
    address: "",
    licenseNumber: "",
    gstNumber: "",
  });

  const [deliveryDetails, setDeliveryDetails] = useState({
    vehicleType: "",
    vehicleNumber: "",
  });

  const handleSignup = async () => {
    try {
      let payload = {
        name,
        phone,
        email,
        password,
        role,
      };

      if (role === "customer") {
        payload.customerDetails = {
          addresses: [customerAddress],
        };
      }

      if (role === "pharmacy") {
        payload.pharmacyDetails = pharmacyDetails;
      }

      if (role === "delivery") {
        payload.deliveryDetails = deliveryDetails;
      }

      await axios.post("http://localhost:5000/api/auth/register", payload);

      alert("Signup successful! Login now.");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
      console.log(err);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('/dawakhana-bg.webp')` }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <GlassCard className="w-full max-w-md">

          <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
            Create Account
          </h2>

          {/* Basic Fields */}
          <div className="flex flex-col gap-4 text-white">

            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Input
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customer" className="text-black">Customer</option>
              <option value="pharmacy" className="text-black">Pharmacy Seller</option>
              <option value="delivery" className="text-black">Delivery Agent</option>
            </Select>

            {/* CUSTOMER FIELDS */}
            {role === "customer" && (
              <div className="grid gap-3">

                <Input
                  placeholder="Address Line"
                  value={customerAddress.addressLine}
                  onChange={(e) =>
                    setCustomerAddress({ ...customerAddress, addressLine: e.target.value })
                  }
                />

                <Input
                  placeholder="City"
                  value={customerAddress.city}
                  onChange={(e) =>
                    setCustomerAddress({ ...customerAddress, city: e.target.value })
                  }
                />

                <Input
                  placeholder="State"
                  value={customerAddress.state}
                  onChange={(e) =>
                    setCustomerAddress({ ...customerAddress, state: e.target.value })
                  }
                />

                <Input
                  placeholder="Pincode"
                  value={customerAddress.pincode}
                  onChange={(e) =>
                    setCustomerAddress({ ...customerAddress, pincode: e.target.value })
                  }
                />

                <Input
                  placeholder="Landmark"
                  value={customerAddress.landmark}
                  onChange={(e) =>
                    setCustomerAddress({ ...customerAddress, landmark: e.target.value })
                  }
                />
              </div>
            )}

            {/* PHARMACY SELLER FIELDS */}
            {role === "pharmacy" && (
              <div className="grid gap-3">

                <Input
                  placeholder="Store Name"
                  value={pharmacyDetails.storeName}
                  onChange={(e) =>
                    setPharmacyDetails({ ...pharmacyDetails, storeName: e.target.value })
                  }
                />

                <Input
                  placeholder="Store Address"
                  value={pharmacyDetails.address}
                  onChange={(e) =>
                    setPharmacyDetails({ ...pharmacyDetails, address: e.target.value })
                  }
                />

                <Input
                  placeholder="Drug License Number"
                  value={pharmacyDetails.licenseNumber}
                  onChange={(e) =>
                    setPharmacyDetails({ ...pharmacyDetails, licenseNumber: e.target.value })
                  }
                />

                <Input
                  placeholder="GST Number"
                  value={pharmacyDetails.gstNumber}
                  onChange={(e) =>
                    setPharmacyDetails({ ...pharmacyDetails, gstNumber: e.target.value })
                  }
                />
              </div>
            )}

            {/* DELIVERY AGENT FIELDS */}
            {role === "delivery" && (
              <div className="grid gap-3">

                <Input
                  placeholder="Vehicle Type (Bike/Scooter)"
                  value={deliveryDetails.vehicleType}
                  onChange={(e) =>
                    setDeliveryDetails({ ...deliveryDetails, vehicleType: e.target.value })
                  }
                />

                <Input
                  placeholder="Vehicle Number"
                  value={deliveryDetails.vehicleNumber}
                  onChange={(e) =>
                    setDeliveryDetails({ ...deliveryDetails, vehicleNumber: e.target.value })
                  }
                />
              </div>
            )}

            {/* Submit Button */}
            <Button onClick={handleSignup}>Create Account</Button>

            <p className="text-center text-white/80 mt-2">
              Already have an account?{" "}
              <span
                className="cursor-pointer font-semibold text-white hover:text-blue-200"
                onClick={() => navigate("/")}
              >
                Login
              </span>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
