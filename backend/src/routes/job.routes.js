import express from "express";
import {
  getJobs,
  toggleSaveJob,
  getSavedJobs,
  createJob,
  getEmployerJobs,
  getInternalJobs   // 🔹 NEW controller
} from "../controllers/job.controller.js";

import {
  verifyJWT,
  authorizeRoles
} from "../middleware/auth.middleware.js";

const router = express.Router();

/* =======================
   PUBLIC / SEEKER ROUTES
======================= */

// External jobs (Adzuna or search-based)
router.get("/search", getJobs);

// 🔹 INTERNAL JOBS (Employer-posted → visible to seekers)
router.get("/internal", verifyJWT, authorizeRoles("job_seeker"), getInternalJobs);

// Save / unsave job (job seeker)
router.post(
  "/:jobId/save",
  verifyJWT,
  authorizeRoles("job_seeker"),
  toggleSaveJob
);

// Get saved jobs (job seeker)
router.get(
  "/saved",
  verifyJWT,
  authorizeRoles("job_seeker"),
  getSavedJobs
);

/* =======================
   EMPLOYER ROUTES
======================= */

// Employer creates a job
router.post(
  "/",
  verifyJWT,
  authorizeRoles("employer"),
  createJob
);

// Employer dashboard jobs
router.get(
  "/employer",
  verifyJWT,
  authorizeRoles("employer"),
  getEmployerJobs
);

export default router;
