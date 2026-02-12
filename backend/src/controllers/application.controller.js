import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const applicantId = req.user.id;

    const alreadyApplied = await Application.findOne({
      jobId,
      applicantId
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    await Application.create({
      jobId,
      applicantId
    });

    await Job.findByIdAndUpdate(jobId, {
      $inc: { applicantsCount: 1 }
    });

    res.status(201).json({ message: "Applied successfully" });
  } catch (err) {
    res.status(500).json({ message: "Application failed" });
  }
};

export const getApplicationsByJob = async (req, res) => {
  const { jobId } = req.params;

  const applications = await Application.find({ jobId })
    .populate("applicantId", "name email");

  res.json(applications);
};
