import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import JobCard from "./JobCard";

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const location = searchParams.get("location");

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/jobs/search?keyword=${keyword}&location=${location}`
    )
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, [keyword, location]);

  return (
    <div>
      <h2>Jobs for "{keyword}"</h2>

      {jobs.map((job: any) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default Jobs;
