const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  userId: String,

  role: String, 

  score: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    default: "Completed"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Interview", interviewSchema);