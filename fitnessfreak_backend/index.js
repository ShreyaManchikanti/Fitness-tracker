// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config(); // Loading environment variables
require("./db.js"); // Connecting to the database

// Initializing express app
const app = express();
const PORT = process.env.PORT || 8000; // Using process.env.PORT if defined, otherwise default to 8000

// Middleware setup
app.use(bodyParser.json()); // Parsing JSON requests
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:3000"]; // Add more origins as needed
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials
  })
);
app.use(cookieParser()); // Parsing cookies

// Importing route modules
const authRoutes = require("./Routes/Auth");
const calorieIntakeRoutes = require("./Routes/CalorieIntake");
const adminRoutes = require("./Routes/Admin");
const imageUploadRoutes = require("./Routes/imageUploadRoutes.js");
const sleepTrackRoutes = require("./Routes/SleepTrack");
const stepTrackRoutes = require("./Routes/StepTrack");
const weightTrackRoutes = require("./Routes/WeightTrack");
const waterTrackRoutes = require("./Routes/Watertrack");
const workoutTrackRoutes = require("./Routes/WorkoutTrack");
const workoutRoutes = require("./Routes/WorkoutPlans");
const reportRoutes = require("./Routes/Report.js");

// Route setup
app.use("/auth", authRoutes);
app.use("/calorieintake", calorieIntakeRoutes);
app.use("/admin", adminRoutes);
app.use("/image-upload", imageUploadRoutes);
app.use("/sleeptrack", sleepTrackRoutes);
app.use("/steptrack", stepTrackRoutes);
app.use("/weighttrack", weightTrackRoutes);
app.use("/watertrack", waterTrackRoutes);
app.use("/workouttrack", workoutTrackRoutes);
app.use("/workoutplans", workoutRoutes);
app.use("/report", reportRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "The API is working" });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
