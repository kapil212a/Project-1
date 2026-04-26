import { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [role, setRole] = useState("Software Engineer");

  const startInterview = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.post(
        "http://127.0.0.1:5000/api/interview/start",
        { userId, role }   // ✅ send role
      );

      localStorage.setItem("interviewId", res.data.interviewId);
      window.location.href = "/interview";

    } catch (err) {
      alert("Error starting interview");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">

      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-[400px] text-center">

        <h1 className="text-2xl font-bold mb-4">
          Start Interview
        </h1>

        <select
          className="w-full p-2 mb-4 rounded bg-gray-900 border border-gray-600"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Software Engineer</option>
          <option>Data Analyst</option>
          <option>HR</option>
        </select>

        <button
          onClick={startInterview}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          Start Interview
        </button>

      </div>

    </div>
  );
}

export default Dashboard;