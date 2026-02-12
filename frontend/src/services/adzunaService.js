import axios from "axios";

export const fetchAdzunaJobs = (query, page = 1) => {
  return axios.get("/api/adzuna", {
    params: { query, page }
  });
};
