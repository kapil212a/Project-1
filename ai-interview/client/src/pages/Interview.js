import React, { useEffect, useState } from "react";
import axios from "axios";

function Interview() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");

  const interviewId = localStorage.getItem("interviewId");

  // fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `https://project-1-2-cki3.onrender.com/api/interview/${interviewId}`
        );
        setQuestions(res.data.questions);
      } catch (err) {
        console.log(err);
      }
    };

    fetchQuestions();
  }, [interviewId]);

  // submit answer
 const submitAnswer = async () => {
  try {
    await axios.post("https://project-1-2-cki3.onrender.com/api/answer", {
      interviewId,
      questionId: questions[current]._id,  
      question: questions[current].text,
      response: answer                     
    });

    setAnswer("");

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      alert("Interview Completed 🎉");
      window.location.href = "/report";
    }

  } catch (err) {
    console.log(err);
    alert("Error submitting answer");
  }
};

  if (questions.length === 0) return <h3>Loading...</h3>;

return (
  <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">

    <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-lg">

      <h2 className="text-xl font-bold mb-4 text-center">
        AI Interview
      </h2>

      <div className="bg-gray-700 p-4 rounded-lg mb-4">
        <p className="text-gray-200">
          {questions[current].text}
        </p>
      </div>

      <textarea
        className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        placeholder="Type your answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button
        onClick={submitAnswer}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition p-2 rounded-lg"
      >
        {current === questions.length - 1 ? "Finish Interview" : "Next Question"}
      </button>

    </div>

  </div>
);
}

export default Interview;