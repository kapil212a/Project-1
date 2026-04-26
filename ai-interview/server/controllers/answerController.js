const Answer = require("../models/Answer");
const Feedback = require("../models/Feedback");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionId, response } = req.body;

    // 1. Save answer
    const answer = await Answer.create({
      interviewId,
      questionId,
      response
    });

    // 2. AI Feedback
    // const aiRes = await client.chat.completions.create({
    //   model: "gpt-4o-mini",
    //   messages: [
    //     {
    //       role: "system",
    //       content: "You are an interview evaluator. Give feedback and score (1-10)."
    //     },
    //     {
    //       role: "user",
    //       content: `Evaluate this answer:\n${response}`
    //     }
    //   ]
    // });

    // const aiText = aiRes.choices[0].message.content;

    let aiText = "";
    let score = 5;

try {
  const aiRes = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are a professional interviewer.

Evaluate the candidate answer based on:
- Relevance to question
- Clarity
- Confidence
- Technical depth

Give:
1. Short feedback (2-3 lines)
2. Score out of 10

Format:
Feedback: ...
Score: X
`
      },
      {
        role: "user",
        content: `
Question: ${req.body.question}
Answer: ${req.body.response}
`
      }
    ]
  });

  const aiOutput = aiRes.choices[0].message.content;

  aiText = aiOutput;

  // extract score (simple)
  const match = aiOutput.match(/Score:\s*(\d+)/i);
  score = match ? parseInt(match[1]) : 5;

} catch (err) {
  console.log("AI error, fallback used");
  aiText = "Decent answer, but needs more clarity and detail.";
}

    // 3. Save feedback
    const feedback = await Feedback.create({
      answerId: answer._id,
      suggestion: aiText,
      score: score
    });

    res.json({ answer, feedback });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};