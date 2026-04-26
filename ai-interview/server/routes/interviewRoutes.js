const express = require("express");
const router = express.Router();

const {
  startInterview,
  getInterview,
  getInterviewReport   
} = require("../controllers/interviewController");

// start interview
router.post("/start", startInterview);

// get interview questions
router.get("/:id", getInterview);

// get report
router.get("/report/:interviewId", getInterviewReport);

module.exports = router;