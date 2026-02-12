import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  resumeUrl: String,
  status: {
    type: String,
    enum: ["new", "reviewed", "shortlisted", "rejected"],
    default: "new"
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Application", ApplicationSchema);
