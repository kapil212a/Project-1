import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [role, setRole] = useState("Software Engineer");
  const [history, setHistory] = useState([]);

  // ✅ START INTERVIEW
  const startInterview = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.post(
        "https://project-1-2-cki3.onrender.com/api/interview/start",
        { userId, role }
      );

      localStorage.setItem("interviewId", res.data.interviewId);
      window.location.href = "/interview";

    } catch (err) {
      alert("Error starting interview");
    }
  };

  // ✅ FETCH INTERVIEW HISTORY
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const res = await axios.get(
          `https://project-1-2-cki3.onrender.com/api/interview/user/${userId}`
        );

        setHistory(res.data);

      } catch (err) {
        console.log("History error:", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">

      {/* 🔹 START INTERVIEW BOX */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-[400px] text-center mb-6">

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

      {/* 🔹 HISTORY SECTION */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-[400px]">

        <h2 className="text-xl font-bold mb-4">
          Interview History
        </h2>

        {history.length === 0 ? (
          <p className="text-gray-400">No interviews yet</p>
        ) : (
          history.map((item) => (
            <div
              key={item._id}
              className="bg-gray-900 p-3 rounded mb-2 border border-gray-700"
            >
              <p className="text-sm">ID: {item._id}</p>
              <p className="text-xs text-gray-400">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Dashboard;