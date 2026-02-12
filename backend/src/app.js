import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";
import atsRoutes from "./routes/ats.routes.js";
import profileRoutes from "./routes/profile.routes.js";


const app = express();
/* TRUST PROXY (IMPORTANT for deployment) */
app.set("trust proxy", 1);
app.disable("x-powered-by");

// GLOBAL REQUEST LOGGER
app.use((req, res, next) => {
  console.log(`🌐 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/* SECURITY HEADERS */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);

/* CORS */
app.use(
  cors({
    origin: "*", // Temporarily allow all for debugging
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

/* BODY PARSER */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

/* RATE LIMITING (API ONLY) */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

// app.use("/api", limiter);

/* TEST ROUTE */
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "API is working - V2", port: process.env.PORT || 8080 });
});

app.get("/api/ats-health", (req, res) => {
  res.status(200).json({ message: "ATS routes are reachable" });
});

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
console.log("🚀 Registering profile routes at /api/profile");
app.use("/api/profile", profileRoutes);
app.use("/api", atsRoutes); // 🔹 Registered at /api, subroutes in ats.routes.js

export default app;
