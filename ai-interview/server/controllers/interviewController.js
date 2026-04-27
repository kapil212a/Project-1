const Interview = require("../models/Interview");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const Feedback = require("../models/Feedback");

// ================= START INTERVIEW =================
exports.startInterview = async (req, res) => {
  try {
    const { userId, role } = req.body;

    const interview = await Interview.create({ userId, role });

    let questionPool = [];

    // 🎯 ROLE BASED QUESTIONS

    if (role === "Software Engineer") {
      questionPool = [
        { text: "Explain closures in JavaScript", difficulty: "medium" },
        { text: "What is REST API?", difficulty: "easy" },
        { text: "Explain your MERN project", difficulty: "medium" },
        { text: "What is async/await?", difficulty: "medium" },
        { text: "Difference between SQL and NoSQL", difficulty: "easy" }
      ];
    }

    else if (role === "Data Analyst") {
      questionPool = [
        { text: "What is data cleaning?", difficulty: "easy" },
        { text: "Explain Excel VLOOKUP", difficulty: "medium" },
        { text: "What is SQL JOIN?", difficulty: "medium" },
        { text: "Explain a data analysis project", difficulty: "medium" },
        { text: "What is data visualization?", difficulty: "easy" }
      ];
    }

    else if (role === "HR") {
      questionPool = [
        { text: "How do you handle conflict?", difficulty: "medium" },
        { text: "Why do you want this job?", difficulty: "easy" },
        { text: "Describe a leadership experience", difficulty: "medium" },
        { text: "How do you evaluate candidates?", difficulty: "hard" },
        { text: "Tell me about a difficult situation", difficulty: "medium" }
      ];
    }

    // 🔀 Random 3 questions
    const shuffled = questionPool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const questions = await Promise.all(
      selected.map(q =>
        Question.create({
          interviewId: interview._id,
          text: q.text,
          difficulty: q.difficulty
        })
      )
    );

    res.json({
      interviewId: interview._id,
      questions
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= GET INTERVIEW QUESTIONS =================
exports.getInterview = async (req, res) => {
  try {
    const interviewId = req.params.id;

    // 🔥 FETCH FROM Question COLLECTION
    const questions = await Question.find({ interviewId });

    if (!questions || questions.length === 0) {
      return res.status(404).json({ msg: "No questions found" });
    }

    res.json({ questions });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= GET REPORT =================
exports.getInterviewReport = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const questions = await Question.find({ interviewId });

    const report = [];

    for (let q of questions) {
      const answer = await Answer.findOne({ questionId: q._id });

      const feedback = answer
        ? await Feedback.findOne({ answerId: answer._id })
        : null;

      report.push({
        question: q.text,
        answer: answer ? answer.response : null,
        feedback: feedback ? feedback.suggestion : null,
        score: feedback ? feedback.score : null
      });
    }

    res.json(report);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET USER INTERVIEW HISTORY
exports.getUserInterviews = async (req, res) => {
  try {
    const { userId } = req.params;

    const interviews = await Interview.find({ userId })
      .sort({ createdAt: -1 });

    res.json(interviews);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};