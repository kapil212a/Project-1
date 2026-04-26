const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    default: "medium"
  }
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);