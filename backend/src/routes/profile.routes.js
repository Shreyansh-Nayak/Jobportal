import express from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyJWT, getProfile);
router.post("/", verifyJWT, updateProfile);

export default router;
