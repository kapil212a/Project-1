const express = require("express");
const router = express.Router();

const {
  startInterview,
  getInterview,
  getInterviewReport,
  getUserInterviews
} = require("../controllers/interviewController");

// ✅ start interview
router.post("/start", startInterview);

// ✅ USER HISTORY (put BEFORE /:id)
router.get("/user/:userId", getUserInterviews);

// ✅ report route
router.get("/report/:interviewId", getInterviewReport);

// ✅ get interview questions (keep LAST)
router.get("/:id", getInterview);

module.exports = router;

router.get("/", async (req, res) => {
  const data = await Interview.find();
  res.json(data);
});