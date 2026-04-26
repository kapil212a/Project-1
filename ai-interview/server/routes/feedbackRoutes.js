const express = require("express");
const router = express.Router();

const { generateFeedback } = require("../controllers/feedbackController");

router.post("/generate", generateFeedback);

module.exports = router;