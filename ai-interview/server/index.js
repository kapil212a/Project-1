const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express(); // create app

// ✅ CORS 
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://kapil212a-project1.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// middleware
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Routes
const authRoutes = require("./routes/authRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const answerRoutes = require("./routes/answerRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

// use routes
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/feedback", feedbackRoutes);

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Server start
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});