const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  interviewId: String,
  questionId: String,
  response: String
}, { timestamps: true });

module.exports = mongoose.model("Answer", answerSchema);