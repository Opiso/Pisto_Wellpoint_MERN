require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorRoute");
const appointmentRoute = require("./routes/appointmentRoute");
const PORT = process.env.PORT || 5000;
const path = require("path");

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = (process.env.FRONTEND_URLS?.split(",") || []).map(
  (origin) => origin.trim().replace(/\/+$/, "")
);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
  })
);

app.use(express.json());

//  Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static files (for React app in the 'dist' folder)
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/appointment", appointmentRoute);

// // Catch-all route to serve index.html for React Router to handle frontend navigation
app.get("*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on Port ${PORT}`);
});
