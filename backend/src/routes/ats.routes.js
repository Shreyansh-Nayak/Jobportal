import express from "express";
import multer from "multer";
import { calculateATSScore } from "../controllers/ats.controller.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Health check for ATS routes
router.get("/ats-health", (req, res) => {
  res.status(200).json({ message: "ATS Router is working and reachable" });
});

// ATS Score calculation route
router.post("/ats", upload.single("resume"), calculateATSScore);

export default router;
