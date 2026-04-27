import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://project-1-2-cki3.onrender.com/api/auth/login",
        { email, password }
      );

      localStorage.setItem("userId", res.data.user._id);
      window.location.href = "/dashboard";

    } catch (err) {
      alert(err.response?.data?.msg || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">

      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-[350px]">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-gray-900 border border-gray-600"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-900 border border-gray-600"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          Login
        </button>

        <p className="mt-4 text-sm">
          New user?{" "}
          <span
            onClick={() => window.location.href = "/register"}
            className="text-blue-400 cursor-pointer"
          >
            Create Account
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;