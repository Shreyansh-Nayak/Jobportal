import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    company: { type: String, default: "" },
    department: { type: String, default: "" },
    location: { type: String, required: true },
    type: { type: String, required: true },
    stipend: { type: String, default: "" },
    salary: { type: String, default: "" },
    experience: { type: String, default: "" },
    skills: { type: String, default: "" },
    responsibilities: { type: String, default: "" },
    qualifications: { type: String, default: "" },
    benefits: { type: String, default: "" },
    deadline: { type: Date },
    contactEmail: { type: String, default: "" },
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, default: "active" },
    posted: { type: Date, default: Date.now },
    applicants: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    applicantsCount: {
      type: Number,
      default: 0
    },
    

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);
