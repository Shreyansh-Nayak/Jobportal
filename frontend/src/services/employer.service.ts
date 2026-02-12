import axios from "@/lib/axios";

export const getApplicationsByJob = async (jobId: string) => {
  const res = await axios.get(`/applications/job/${jobId}`);
  return res.data;
};
