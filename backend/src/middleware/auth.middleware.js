import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Verify Access Token (JWT)
 */
export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("🔐 verifyJWT middleware - Auth header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ Missing or invalid auth header");
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Fetch fresh user data from DB to ensure role is up-to-date
    const user = await User.findById(decoded.id);

    if (!user) {
      console.log("❌ User not found in DB for ID:", decoded.id);
      return res.status(401).json({ message: "User not found" });
    }

    console.log("✅ Token verified & User fetched, Role:", user.role);

    // Attach current user info to request
    req.user = {
      id: user._id,
      role: user.role,
      email: user.email
    };

    next();
  } catch (error) {
    console.error("❌ Token verification error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * Optional Role-Based Access Control
 * Usage: authorizeRoles("admin", "employer")
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log("👥 authorizeRoles check:", roles, "User role:", req.user?.role);
    if (!req.user || !roles.includes(req.user.role)) {
      console.log("❌ Access denied: role mismatch");
      return res.status(403).json({
        message: "Access denied: role mismatch",
        required: roles,
        found: req.user?.role
      });
    }
    next();
  };
};
