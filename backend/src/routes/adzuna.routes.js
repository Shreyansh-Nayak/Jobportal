import express from "express";
import { getAdzunaJobs } from "../controllers/adzuna.controller.js";

const router = express.Router();

router.get("/", getAdzunaJobs);

export default router;
