const Feedback = require("../models/Feedback");
const Answer = require("../models/Answer");

// Dummy AI logic (replace later with OpenAI)
exports.generateFeedback = async (req, res) => {
  try {
    const { answerId } = req.body;

    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res.status(404).json({ msg: "Answer not found" });
    }

    // Simple scoring logic (temporary AI)
    let score = 5;
    let suggestion = "Good attempt. Try to be more detailed.";

    if (answer.response.length > 50) {
      score = 7;
      suggestion = "Nice explanation. Add more real-world examples.";
    }

    if (answer.response.length > 100) {
      score = 9;
      suggestion = "Excellent answer with strong clarity.";
    }

    const feedback = await Feedback.create({
      answerId,
      score,
      suggestion
    });

    res.json(feedback);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};