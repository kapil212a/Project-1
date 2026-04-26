import React, { useEffect, useState } from "react";
import axios from "axios";

function Report() {
  const [report, setReport] = useState([]);

  const interviewId = localStorage.getItem("interviewId");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:5000/api/interview/report/${interviewId}`
        );
        setReport(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchReport();
  }, [interviewId]);

  if (report.length === 0) return <h3>Loading Report...</h3>;

  return (
  <div className="min-h-screen bg-gray-900 text-white p-6">

    <h2 className="text-3xl font-bold text-center mb-6">
      Interview Report
    </h2>

    <div className="max-w-3xl mx-auto space-y-4">
      {report.map((item, index) => (
        <div key={index} className="bg-gray-800 p-5 rounded-xl shadow">

          <p className="text-lg font-semibold mb-2">
            Q: {item.question}
          </p>

          <p className="text-gray-300">
            <b>Your Answer:</b> {item.answer}
          </p>

          <p className="text-blue-400 mt-2">
            <b>Feedback:</b> {item.feedback || "Pending"}
          </p>

          <p className="text-green-400">
            <b>Score:</b> {item.score || 0}/10
          </p>

        </div>
      ))}
    </div>

  </div>
);
}

export default Report;