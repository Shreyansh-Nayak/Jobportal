// controllers/savedJob.controller.js
import SavedJob from "../models/SavedJob.js";

export const saveJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.user.id; // from auth middleware

  const exists = await SavedJob.findOne({ userId, jobId });
  if (exists) {
    return res.status(200).json({ message: "Already saved" });
  }

  const saved = await SavedJob.create({ userId, jobId });
  res.status(201).json(saved);
};
