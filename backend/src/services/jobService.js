import Job from "../models/job.model.js";

export const getInternalJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true })
      .sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch internal jobs" });
  }
};
