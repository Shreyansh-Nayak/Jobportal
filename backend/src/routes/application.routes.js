import express from "express";
import {
  applyToJob,
  getApplicationsByJob
} from "../controllers/application.controller.js";

import {
  verifyJWT,
  authorizeRoles
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Job seeker applies to job
router.post(
  "/",
  verifyJWT,
  authorizeRoles("job_seeker"),
  applyToJob
);

// Employer views applicants for a job
router.get(
  "/job/:jobId",
  verifyJWT,
  authorizeRoles("employer"),
  getApplicationsByJob
);

export default router;
