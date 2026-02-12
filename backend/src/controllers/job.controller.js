import { fetchJobsFromAdzuna } from "../services/adzuna.service.js";
import User from "../models/User.js";
import Job from "../models/Job.js";

/* CREATE JOB POSTING */
export const createJob = async (req, res) => {
  try {
    // Accept all fields coming from frontend PostJobModal
    const {
      title,
      description,
      location,
      type,
      stipend,
      company,
      department,
      experience,
      skills,
      responsibilities,
      qualifications,
      benefits,
      deadline,
      contactEmail,
    } = req.body;

    const employerId = req.user.id;

    console.log("📝 createJob called for employer:", employerId);

    // Basic validation
    if (!title || !location || !type || !description || !contactEmail) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Build job payload
    const jobPayload = {
      title,
      description,
      company,
      department,
      location,
      type,
      stipend,
      salary: stipend || req.body.salary || "",
      experience,
      skills,
      responsibilities,
      qualifications,
      benefits,
      deadline: deadline ? new Date(deadline) : undefined,
      contactEmail,
      employerId,
      status: "active",
    };

    // Persist to DB
    const createdJob = await Job.create(jobPayload);

    console.log("✅ Job persisted with id:", createdJob._id);

    res.status(201).json(createdJob);
  } catch (error) {
    console.error("❌ Error creating job:", error);
    res.status(500).json({ message: "Failed to create job" });
  }
};

/* SAVE / UNSAVE JOB */
export const toggleSaveJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.savedJobs.includes(jobId)) {
      user.savedJobs = user.savedJobs.filter(id => id !== jobId);
    } else {
      user.savedJobs.push(jobId);
    }

    await user.save();

    res.status(200).json({ message: "Job saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save job" });
  }
};

/* GET ALL SAVED JOB IDs */
export const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json(user.savedJobs); // array of job IDs
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch saved jobs" });
  }
};

/* FETCH JOBS FROM ADZUNA */
export const getJobs = async (req, res) => {
  try {
    let { query, page } = req.query;

    query = query?.trim() || "software";
    page = page ? Number(page) : 1;

    const jobs = await fetchJobsFromAdzuna({ query, page });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }

};
export const getEmployerJobs = async (req, res) => {
  console.log("💼 getEmployerJobs controller hit for user:", req.user?.id);
  const employerId = req.user.id;

  const jobs = await Job.find({ employerId }).sort({ createdAt: -1 });

  res.json(jobs);
};


export const getInternalJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true })
      .sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch internal jobs" });
  }
};


