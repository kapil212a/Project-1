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
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">

  <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-[400px] text-center">

    <h2 className="text-2xl font-bold mb-4">
      Create Account
    </h2>

    <input
      className="w-full p-2 mb-3 rounded bg-gray-900 border border-gray-600"
      placeholder="Name"
      onChange={(e) => setName(e.target.value)}
    />

    <input
      className="w-full p-2 mb-3 rounded bg-gray-900 border border-gray-600"
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      className="w-full p-2 mb-4 rounded bg-gray-900 border border-gray-600"
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      onClick={handleRegister}
      className="w-full bg-green-600 hover:bg-green-700 p-2 rounded"
    >
      Register
    </button>

    <p className="mt-4 text-sm">
      Already have an account?{" "}
      <span
        onClick={() => window.location.href = "/"}
        className="text-blue-400 cursor-pointer"
      >
        Login
      </span>
    </p>

  </div>
</div>
  );
}

export default Register;