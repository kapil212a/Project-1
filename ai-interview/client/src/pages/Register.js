import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(
        "https://project-1-2-cki3.onrender.com/api/auth/register",
        { name, email, password }
      );

      alert("Account created ✅");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.msg || "Registration Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-3xl font-bold">Create Account</h2>

      <input className="border p-2 w-64" placeholder="Name"
        onChange={(e) => setName(e.target.value)} />

      <input className="border p-2 w-64" placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} />

      <input className="border p-2 w-64" type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleRegister}
        className="bg-green-500 text-white px-6 py-2 rounded">
        Register
      </button>

      <p>
        Already have an account?{" "}
        <span onClick={() => window.location.href = "/"}
          className="text-blue-500 cursor-pointer">
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;