import axios from "axios";

export const fetchInternalJobs = () => {
  return axios.get("/api/jobs/internal", {
    withCredentials: true
  });
};
