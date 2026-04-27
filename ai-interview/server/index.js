// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const app = express();

// // ✅ CORS FIRST (VERY IMPORTANT)
// app.use(cors({
//   origin: "https://kapil212a-project1.vercel.app",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// // ✅ THEN middleware
// app.use(express.json());

// // Routes
// const authRoutes = require("./routes/authRoutes");
// const interviewRoutes = require("./routes/interviewRoutes");
// const answerRoutes = require("./routes/answerRoutes");
// const feedbackRoutes = require("./routes/feedbackRoutes");

// app.use("/api/auth", authRoutes);
// app.use("/api/interview", interviewRoutes);
// app.use("/api/answer", answerRoutes);
// app.use("/api/feedback", feedbackRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("API is running 🚀");
// });

// // DB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// // Start server
// app.listen(5000, "0.0.0.0", () => {
//   console.log("Server running on port 5000");
// });


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ✅ CORS FIRST
app.use(cors());

// ✅ middleware
app.use(express.json());

// ✅ routes
const authRoutes = require("./routes/authRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const answerRoutes = require("./routes/answerRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/feedback", feedbackRoutes);

// ✅ test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ server
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});