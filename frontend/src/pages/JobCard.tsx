import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import api from "@/lib/axios";

const JobCard = ({ job }: any) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    // ❌ NOT LOGGED IN → SAME BEHAVIOR
    if (!token) {
      navigate(`/auth?mode=login&redirect=/jobs/${job._id}`);
      return;
    }

    // ❌ Already applied
    if (applied) return;

    try {
      setLoading(true);

      // ✅ APPLY API CALL (NEW)
      await api.post("/applications", {
        jobId: job._id
      });

      setApplied(true);

      // ✅ OPTIONAL: keep navigation behavior if you want
      // navigate(`/jobs/${job._id}/apply`);

    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.company}</p>

      <button
        onClick={handleApply}
        disabled={loading || applied}
        style={{
          opacity: loading || applied ? 0.6 : 1,
          cursor: loading || applied ? "not-allowed" : "pointer"
        }}
      >
        {applied ? "Applied" : loading ? "Applying..." : "Apply"}
      </button>
    </div>
  );
};

export default JobCard;
