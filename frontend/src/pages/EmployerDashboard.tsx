import { useState, useEffect } from "react";
import {
  Briefcase, PlusCircle, Users, FileText, Bell, TrendingUp, Eye, Clock, MapPin, DollarSign,
  Edit2, Trash2, CheckCircle, Calendar
} from "lucide-react";
import { useLocation } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import PostJobModal from "@/components/PostJobModel";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const name = (location.state as { name: string })?.name || "TechCorp";

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/jobs/employer");
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      toast.error("Failed to load your job postings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePostJob = async (jobData) => {
    try {
      await api.post("/jobs", jobData);
      toast.success("Job posted successfully!");
      fetchJobs();
    } catch (error) {
      console.error("Failed to post job:", error);
      toast.error("Failed to post job. Please try again.");
    }
  };

  const activeJobsCount = jobs.filter(j => j.status === "active").length;
  const totalApplicants = jobs.reduce((sum, j) => sum + (j.applicantsCount || 0), 0);

  const stats = [
    { label: "Active Jobs", value: String(activeJobsCount), change: "+0", icon: Briefcase, color: "from-blue-500 to-cyan-500" },
    { label: "Total Applicants", value: String(totalApplicants), change: "+0", icon: Users, color: "from-green-500 to-emerald-500" },
    { label: "Interviews", value: "0", change: "+0", icon: Calendar, color: "from-purple-500 to-violet-500" },
    { label: "Hired", value: "0", change: "+0", icon: CheckCircle, color: "from-orange-500 to-amber-500" },
  ];

  const recentApplicants = [
    { name: "Alex Johnson", role: "Senior Frontend Developer", time: "2 hours ago", status: "new", avatar: "AJ" },
    { name: "Sarah Chen", role: "Product Designer", time: "5 hours ago", status: "reviewed", avatar: "SC" },
    { name: "Mike Peters", role: "Backend Engineer", time: "1 day ago", status: "shortlisted", avatar: "MP" },
    { name: "Emily Davis", role: "DevOps Engineer", time: "2 days ago", status: "new", avatar: "ED" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "paused": return "bg-yellow-100 text-yellow-700";
      case "closed": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getApplicantStatusColor = (status) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-700";
      case "reviewed": return "bg-purple-100 text-purple-700";
      case "shortlisted": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const filteredJobs = activeTab === "all" ? jobs : jobs.filter(j => j.status === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navbar */}
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {name}! 👋</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your job postings</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-5 h-5" />
            Post New Job
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 text-left"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PlusCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Post a Job</h3>
            <p className="text-sm text-gray-600">Create a new job listing and reach top talent</p>
          </button>

          <button className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 text-left">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Browse Candidates</h3>
            <p className="text-sm text-gray-600">Search our database of qualified professionals</p>
          </button>

          <button className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 text-left">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">View Reports</h3>
            <p className="text-sm text-gray-600">Analytics and insights for your postings</p>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Listings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Active Job Postings</h2>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
                </div>
                <div className="flex gap-2">
                  {["all", "active", "paused", "closed"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${activeTab === tab
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {loading ? (
                  <div className="p-6 text-center text-gray-500">Loading your jobs...</div>
                ) : filteredJobs.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No jobs found.</div>
                ) : (
                  filteredJobs.map((job) => (
                    <div key={job._id || job.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Briefcase className="w-4 h-4" />
                              {job.type}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <DollarSign className="w-4 h-4" />
                              {job.salary || job.stipend}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              {job.posted ? new Date(job.posted).toLocaleDateString() : "Just now"}
                            </span>
                          </div>
                          <div className="flex items-center gap-6">
                            <span className="flex items-center gap-2 text-sm">
                              <Users className="w-4 h-4 text-blue-500" />
                              <span className="font-medium text-gray-900">{job.applicantsCount || 0}</span>
                              <span className="text-gray-500">applicants</span>
                            </span>
                            <span className="flex items-center gap-2 text-sm">
                              <Eye className="w-4 h-4 text-green-500" />
                              <span className="font-medium text-gray-900">{job.views || 0}</span>
                              <span className="text-gray-500">views</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                  ))}
              </div>
            </div>
          </div>

          {/* Recent Applicants */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Recent Applicants</h2>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {recentApplicants.map((applicant, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {applicant.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{applicant.name}</p>
                        <p className="text-sm text-gray-500 truncate">{applicant.role}</p>
                      </div>
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getApplicantStatusColor(applicant.status)}`}>
                        {applicant.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 ml-13">{applicant.time}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-t border-gray-100">
                <button className="w-full py-3 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  View All Applicants →
                </button>
              </div>
            </div>

            {/* Pro Tip Card */}
            <div className="mt-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Pro Tip</h3>
                  <p className="text-sm text-blue-100">Jobs with detailed descriptions get 3x more qualified applicants. Update your listings today!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <PostJobModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handlePostJob}
        />
      )}
    </div>
  );
}
