import { fetchJobsFromAdzuna } from "../services/adzuna.service.js";

export const getAdzunaJobs = async (req, res) => {
  try {
    const { query = "developer", page = 1 } = req.query;

    const data = await fetchJobsFromAdzuna({ query, page });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
