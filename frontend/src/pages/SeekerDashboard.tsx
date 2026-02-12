import api from "@/lib/axios";
import { useEffect, useState } from "react";
import JobCardSkeleton from "@/components/skeletons/JobCardSkeleton";
import toast from "react-hot-toast";
import DashboardNavbar from "@/components/DashboardNavbar";



import {
  Briefcase, Search, BookmarkPlus, Bell, ChevronDown, TrendingUp,
  Eye, Clock, MapPin, DollarSign, Building2, Heart, Send,
  FileText, Award, Target, Zap, Star, CheckCircle, ArrowRight,
  Filter, Bookmark, ExternalLink
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
export interface Job {
  id: number;              // Adzuna ID (always present)
  _id?: string;            // MongoDB ID (only if stored later)

  title: string;

  company: {
    display_name: string;
  };

  location: {
    display_name: string;
  };

  redirect_url: string;
  created: string;

  contract_type?: string;
  contract_time?: string;

  salary_min?: number;
  salary_max?: number;

  category?: {
    label?: string;
  };
}




const SeekerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const name = (routerLocation.state as { name: string })?.name ?? "User";


  const [jobs, setJobs] = useState<Job[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [profileStrength, setProfileStrength] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showAll, setShowAll] = useState(false);



  const [searchQuery, setSearchQuery] = useState("software");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  interface SavedJob {
    _id: string;
    jobId: Job;
  }

  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);




  useEffect(() => {
    const fetchSavedJobs = async () => {
      const res = await api.get("jobs/saved");
      setSavedJobs(res.data); // array of job IDs
    };

    fetchSavedJobs();
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);


  console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);



  const calculateStrength = (profileData: any) => {
    if (!profileData) return 0;
    const sections = {
      basicInfo: !!profileData.basicInfo?.fullName && !!profileData.basicInfo?.phone,
      summary: !!profileData.summary?.about,
      resume: !!profileData.resume,
      skills: profileData.skills?.length > 0,
      experience: profileData.experience?.length > 0,
    };
    const completed = Object.values(sections).filter(Boolean).length;
    return Math.round((completed / Object.keys(sections).length) * 100);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setProfile(res.data);
        setProfileStrength(calculateStrength(res.data));
      } catch (err) {
        console.error("Dashboard profile fetch error", err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    setShowAll(false);
  }, [page, searchQuery]);


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        console.log("Fetching page:", page);

        const response = await api.get("jobs/search", {
          params: {
            query: debouncedQuery || "software",
            page,
            limit: 10,
          },
        });
        console.log("Jobs API response:", response.data);


        setJobs(response.data.results || []);
        const pageSize = 10;
        setTotalPages(Math.ceil((response.data.count || 0) / pageSize));

      } catch (err) {
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, searchQuery]);



  const stats = [
    { label: "Applications Sent", value: "24", change: "+3", icon: Send, color: "from-blue-500 to-cyan-500" },
    { label: "Profile Views", value: "156", change: "+12", icon: Eye, color: "from-green-500 to-emerald-500" },
    { label: "Saved Jobs", value: "18", change: "+5", icon: Bookmark, color: "from-purple-500 to-violet-500" },
    { label: "Interviews", value: "6", change: "+2", icon: Award, color: "from-orange-500 to-amber-500" },
  ];

  const recommendedJobs = [
    { id: 1, title: "Senior Frontend Developer", company: "TechCorp Inc.", location: "San Francisco, CA", type: "Full-time", salary: "$120k-$150k", posted: "2 hours ago", logo: "TC", match: 95, skills: ["React", "TypeScript", "Node.js"] },
    { id: 2, title: "Product Designer", company: "DesignHub", location: "Remote", type: "Full-time", salary: "$90k-$120k", posted: "5 hours ago", logo: "DH", match: 88, skills: ["Figma", "UI/UX", "Prototyping"] },
    { id: 3, title: "Full Stack Engineer", company: "StartupXYZ", location: "New York, NY", type: "Full-time", salary: "$100k-$130k", posted: "1 day ago", logo: "SX", match: 82, skills: ["Python", "React", "AWS"] },
    { id: 4, title: "DevOps Engineer", company: "CloudScale", location: "Austin, TX", type: "Contract", salary: "$80/hr", posted: "2 days ago", logo: "CS", match: 78, skills: ["Kubernetes", "Docker", "CI/CD"] },
  ];

  const applications = [
    { company: "Google", role: "Software Engineer", status: "Interview", date: "Nov 18", logo: "G" },
    { company: "Meta", role: "Frontend Developer", status: "Applied", date: "Nov 15", logo: "M" },
    { company: "Amazon", role: "Full Stack Dev", status: "Reviewed", date: "Nov 12", logo: "A" },
  ];
  const toggleSave = async (job: Job) => {
    try {
      const isSaved = savedJobs.some(sj => sj.jobId.id === job.id);

      if (isSaved) {
        await api.delete(`saved-jobs/${job.id}`);

        setSavedJobs(prev =>
          prev.filter(sj => sj.jobId.id !== job.id)
        );

        toast("Job removed from saved");
      } else {
        const res = await api.post("saved-jobs", { job });

        setSavedJobs(prev => [...prev, res.data]);
        toast.success("Your job is saved");
      }
    } catch {
      toast.error("Action failed");
    }
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case "Interview": return "bg-green-100 text-green-700";
      case "Applied": return "bg-blue-100 text-blue-700";
      case "Reviewed": return "bg-purple-100 text-purple-700";
      case "Rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };
  const visibleJobs = showAll ? jobs : jobs.slice(0, 5);
  const token = localStorage.getItem("token");

  const handleSaveJob = async (jobId: number) => {
    await api.post(`jobs/${jobId}/save`);
    toast.success("Your job is saved ❤️");
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navbar */}
      <DashboardNavbar />


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {name} 👋</h1>
            <p className="text-gray-600 mt-1">Ready to find your dream job? Let's get started!</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs..."
                className="pl-12 pr-4 py-3 w-64 border-2 border-gray-200 rounded-xl ..."
              />

            </div>
            <button className="p-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
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
          <button className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 text-left">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Search className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Browse Jobs</h3>
            <p className="text-sm text-gray-600">Discover thousands of opportunities matching your skills</p>
          </button>

          <button className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 text-left">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookmarkPlus className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Saved Jobs</h3>
            <p className="text-sm text-gray-600">View and manage your bookmarked opportunities</p>
          </button>

          <button onClick={() => navigate("/resume")} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 text-left">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">

              <FileText className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">My Resume</h3>
            <p className="text-sm text-gray-600">Update your resume to attract more employers</p>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recommended Jobs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
                    <p className="text-sm text-gray-500 mt-1">Jobs matching your profile and preferences</p>
                  </div>

                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {/* Loading skeletons */}
                {loading &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <JobCardSkeleton key={i} />
                  ))}

                {/* Error state */}
                {!loading && error && (
                  <div className="p-6 text-red-500">
                    {error}
                  </div>
                )}

                {/* Empty state */}
                {!loading && !error && jobs.length === 0 && (
                  <div className="p-6 text-gray-600">
                    No jobs found
                  </div>
                )}

                {/* Jobs list */}
                {!loading && !error && jobs.length > 0 &&
                  visibleJobs.map((job) => {
                    const isSaved = savedJobs.some(
                      (savedJob) => savedJob._id === job._id
                    );
                    return (

                      <div
                        key={job._id ?? String(job.id)}
                        className="p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-700 font-bold text-lg flex-shrink-0">
                            {job.company?.display_name?.charAt(0) ?? "?"}

                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                  {job.company?.display_name ?? "Company not disclosed"}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">

                                </span>

                                <button
                                  onClick={() => handleSaveJob(job.id)}


                                  className={`p-2 rounded-lg transition-colors ${savedJobs.some(sj => sj.jobId.id === job.id)

                                    ? "text-red-500 bg-red-50"
                                    : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                                    }`}
                                >
                                  <Heart className={`w-5 h-5 ${savedJobs.some(sj => sj.jobId.id === job.id)
                                    ? "fill-current" : ""}`} />
                                </button>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                {job.location?.display_name ?? "Remote / Not specified"}

                              </span>
                              <span className="flex items-center gap-1.5">
                                <Briefcase className="w-4 h-4" />
                                {job.contract_type ?? "Not specified"}
                              </span>

                              <span className="flex items-center gap-1.5">
                                <DollarSign className="w-4 h-4" />
                                {job.salary_min && job.salary_max
                                  ? `₹${job.salary_min} - ₹${job.salary_max}`
                                  : "Salary not disclosed"}
                              </span>

                              <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {new Date(job.created).toDateString()}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">

                            </div>

                            <div className="flex items-center gap-3">
                              <a
                                href={job.redirect_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                              >
                                Apply Now
                              </a>

                              {/* <button className="px-5 py-2.5 border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-600 text-sm font-semibold rounded-xl transition-colors">
                              View Details
                            </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {!loading && jobs.length > 5 && (
                  <div className="flex justify-center p-4">
                    <button
                      onClick={() => setShowAll((prev) => !prev)}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {showAll ? "Show less" : "View all jobs"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && !showAll && (
              <div className="flex items-center justify-center gap-4 p-6 border-t border-gray-100">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500"
                >
                  Previous
                </button>

                <span className="text-sm font-medium text-gray-600">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500"
                >
                  Next
                </button>
              </div>
            )}
          </div>





          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Saved Jobs
              </h2>

              {savedJobs.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No saved jobs yet
                </p>
              ) : (
                <div className="space-y-4">
                  {savedJobs.slice(0, 3).map((item) => (
                    <div key={item._id} className="border-b pb-3">
                      <p className="font-semibold text-sm text-gray-900">
                        {item.jobId.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.jobId.company.display_name}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {savedJobs.length > 3 && (
                <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700">
                  View all saved jobs →
                </button>
              )}
            </div>

            {/* Application Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">My Applications</h2>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {applications.map((app, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-700 font-bold">
                        {app.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{app.company}</p>
                        <p className="text-sm text-gray-500 truncate">{app.role}</p>
                      </div>
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 ml-13">Applied {app.date}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-t border-gray-100">
                <button className="w-full py-3 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Track All Applications →
                </button>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Profile Strength</h3>
                <span className="text-sm font-semibold text-blue-600">{profileStrength}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000"
                  style={{ width: `${profileStrength}%` }}
                ></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  {profile?.basicInfo?.fullName ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>}
                  <span className="text-gray-600">Basic info completed</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  {profile?.resume ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>}
                  <span className="text-gray-600">Resume uploaded</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  {profile?.experience?.length > 0 ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>}
                  <span className="text-gray-600">Add work experience</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  {profile?.skills?.length > 0 ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>}
                  <span className="text-gray-600">Add skills</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/profile")}
                className="w-full mt-4 py-3 border-2 border-blue-500 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
              >
                Complete Profile
              </button>
            </div>

            {/* Pro Tip Card */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Quick Tip</h3>
                  <p className="text-sm text-blue-100">Complete your profile to get 3x more visibility from top employers!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeekerDashboard;
