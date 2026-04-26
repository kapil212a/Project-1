const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  answerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
    required: true
  },
  score: Number,
  suggestion: String
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);