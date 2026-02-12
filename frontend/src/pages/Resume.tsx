import { useState } from "react";
import { Upload, FileText, Loader2, CheckCircle, AlertCircle, TrendingUp, Target, Sparkles } from "lucide-react";
import api from "@/lib/axios";

const Resume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please upload a PDF file");
    }
  };

  const handleSubmit = async () => {
    if (!file || !jobTitle) {
      alert("Please upload resume & enter job title");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobTitle", jobTitle);

      const { data } = await api.post("ats", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setScore(data.score);
      console.log("✅ ATS Score calculated:", data.score);
    } catch (error) {
      console.error("❌ Error analyzing resume:", error);
      alert("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-500";
    if (score >= 60) return "from-yellow-500 to-amber-500";
    return "from-red-500 to-orange-500";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "Excellent! Your resume is well-optimized for ATS.";
    if (score >= 60) return "Good! Consider some improvements to boost your score.";
    return "Needs work. Your resume may not pass ATS filters.";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-8 h-8" />;
    if (score >= 60) return <Sparkles className="w-8 h-8" />;
    return <AlertCircle className="w-8 h-8" />;
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-6">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full border border-blue-200 mb-6">
          <Target className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">AI-Powered ATS Analysis</span>
        </div>

        <h1 className="text-5xl font-bold text-foreground mb-4">
          Optimize Your Resume for{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            ATS Systems
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get instant feedback on how well your resume performs with Applicant Tracking Systems
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-12 border border-border">
          {/* Job Title Input */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-muted-foreground mb-3 block flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Job Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-4 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-foreground font-medium"
              placeholder="e.g. Frontend Developer, Marketing Manager"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          {/* Resume Upload */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-muted-foreground mb-3 block flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Upload Your Resume (PDF)
            </label>

            <div className="relative">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-border rounded-xl hover:border-blue-500 hover:bg-card transition-all cursor-pointer group"
              >
                <Upload className="w-12 h-12 text-muted-foreground group-hover:text-blue-600 transition-colors mb-3" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-blue-600 transition-colors">
                  {file ? "Change file" : "Click to upload or drag and drop"}
                </span>
                <span className="text-xs text-muted-foreground/80 mt-1">PDF files only</span>
              </label>
            </div>

            {file && (
              <div className="mt-4 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !file || !jobTitle}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Target className="w-6 h-6" />
                Get ATS Score
              </>
            )}
          </button>

          {/* Score Display */}
          {score !== null && (
            <div className="mt-10 space-y-6 animate-fade-in">
              {/* Score Card */}
              <div className={`relative p-8 bg-gradient-to-br ${getScoreColor(score)} rounded-2xl text-white overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">Your ATS Score</h3>
                    {getScoreIcon(score)}
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-7xl font-bold">{score}</span>
                    <span className="text-3xl font-semibold opacity-90">/ 100</span>
                  </div>

                  <p className="text-lg opacity-90">{getScoreMessage(score)}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-muted-foreground/10 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getScoreColor(score)} transition-all duration-1000 ease-out`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>

              {/* Score Breakdown */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {score >= 80 ? "High" : score >= 60 ? "Medium" : "Low"}
                  </div>
                  <div className="text-sm text-muted-foreground">Match Quality</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {score >= 70 ? "Good" : "Improve"}
                  </div>
                  <div className="text-sm text-muted-foreground">Keyword Usage</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {score >= 75 ? "Clean" : "Check"}
                  </div>
                  <div className="text-sm text-muted-foreground">Formatting</div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Recommendations to Improve Your Score
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Use keywords from the job description naturally throughout your resume</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Keep formatting simple - avoid tables, images, and complex layouts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Include relevant skills, certifications, and achievements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Use standard section headings like "Work Experience" and "Education"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Tailor your resume for each specific job application</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setScore(null);
                    setFile(null);
                    setJobTitle("");
                  }}
                  className="flex-1 py-3 bg-card border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all"
                >
                  Analyze Another Resume
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                  Download Report
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-foreground mb-2">ATS Optimized</h3>
            <p className="text-sm text-muted-foreground">Get past applicant tracking systems with confidence</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Instant Results</h3>
            <p className="text-sm text-muted-foreground">Get your score in seconds, no waiting required</p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Actionable Tips</h3>
            <p className="text-sm text-muted-foreground">Receive specific suggestions to improve your resume</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Resume;