const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const patientRoutes = require("./routes/patient.routes");

const app = express();

const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : true;

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/patients", patientRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Health Insurance API is running!",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);

  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

module.exports = app;