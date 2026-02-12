import jwt from "jsonwebtoken";
import admin from "../config/firebaseAdmin.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const firebaseAuth = async (req, res) => {
  try {
    const { firebaseToken, role, mode } = req.body;
    
    console.log("🔐 Firebase Auth endpoint called");
    console.log("Mode:", mode);
    console.log("Role:", role);
    console.log("Token received:", firebaseToken ? "Yes" : "No");

    if (!firebaseToken) {
      return res.status(400).json({ message: "Firebase ID token missing" });
    }

    // Verify Firebase ID Token
    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    const { uid, email, name } = decoded;

    let user = await User.findOne({ firebaseUid: uid });

    // First-time signup or auto-create on login
    if (!user) {
      // For signup mode, role is required
      if (mode === "signup" && !role) {
        return res.status(400).json({
          message: "Role is required for signup",
        });
      }

      // For login mode, use default role (job_seeker) and auto-create account
      const userRole = role || "job_seeker";
      
      user = await User.create({
        firebaseUid: uid,
        email,
        fullName: name || email.split("@")[0],
        role: userRole,
        provider: "firebase",
      });
      
      console.log("✅ New user created:", email, "with role:", userRole);
    }

    // Issue JWT for your app
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ Auth successful for:", email);

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Firebase auth error:", err);
    return res.status(401).json({ message: "Invalid Firebase token" });
  }
};

// Email/Password Register
export const register = async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;

    console.log("📝 Register endpoint called for:", email);

    // Validate required fields
    if (!email || !password || !fullName || !role) {
      return res.status(400).json({
        message: "Email, password, fullName, and role are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      fullName,
      role,
      provider: "local",
    });

    console.log("✅ User registered:", email);

    // Issue JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Registration failed" });
  }
};

// Email/Password Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔑 Login endpoint called for:", email);

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.password) {
      console.log("❌ User has no password (Firebase user):", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    console.log("🔍 Comparing passwords...");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log("❌ Password mismatch for:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("✅ Login successful:", email);

    // Issue JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Login failed" });
  }
};
