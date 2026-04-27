const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  userId: String,

  role: String,        // ✅ IMPORTANT
  score: Number,       // ✅ IMPORTANT
  status: String,      // ✅ IMPORTANT

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Interview", interviewSchema);