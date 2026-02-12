import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      default: null,
    },

    firebaseUid: {
      type: String,
      default: null,
    },

    provider: {
      type: String,
      enum: ["firebase", "linkedin", "local"],
      default: "local",
    },

    role: {
      type: String,
      enum: ["job_seeker", "employer", "admin"],
      default: "job_seeker",
    },

    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
