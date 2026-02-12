import express from "express";
import { firebaseAuth, register, login } from "../controllers/auth.controller.js";

const router = express.Router();

// Firebase Auth
router.post("/firebase-login", firebaseAuth);
router.post("/firebase-register", firebaseAuth);

// Email/Password Auth
router.post("/register", register);
router.post("/login", login);

// Logout
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
