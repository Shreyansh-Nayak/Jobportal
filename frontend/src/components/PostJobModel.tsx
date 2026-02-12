import { useState, ChangeEvent } from "react";

type JobForm = {
  title: string;
  description: string;
  location: string;
  type: string;
  stipend: string;
  company: string;
  department: string;
  experience: string;
  skills: string;
  responsibilities: string;
  qualifications: string;
  benefits: string;
  deadline: string;
  contactEmail: string;
};

type PostJobModalProps = {
  onClose: () => void;
  onSubmit: (data: JobForm) => void;
};

export default function PostJobModal({
  onClose,
  onSubmit,
}: PostJobModalProps) {
  const [form, setForm] = useState<JobForm>({
    title: "",
    description: "",
    location: "",
    type: "Full-time",
    stipend: "",
    company: "",
    department: "",
    experience: "",
    skills: "",
    responsibilities: "",
    qualifications: "",
    benefits: "",
    deadline: "",
    contactEmail: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Post a New Job</h2>
              <p className="text-sm text-gray-500 mt-1">Fill in the details to create your job listing</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-8 py-6 max-h-[calc(100vh-240px)] overflow-y-auto">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="title"
                    placeholder="e.g. Senior Software Engineer"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="company"
                    placeholder="e.g. Tech Corp Inc."
                    value={form.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    name="department"
                    placeholder="e.g. Engineering"
                    value={form.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="location"
                    placeholder="e.g. San Francisco, CA (Remote)"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="stipend"
                    placeholder="e.g. $80,000 - $120,000 per year"
                    value={form.stipend}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Required
                  </label>
                  <input
                    name="experience"
                    placeholder="e.g. 3-5 years"
                    value={form.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Deadline
                  </label>
                  <input
                    name="deadline"
                    type="date"
                    value={form.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                Job Details
              </h3>
              <div className="space-y-4 ml-11">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Provide a detailed description of the role, work environment, and what makes this opportunity unique..."
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Responsibilities
                  </label>
                  <textarea
                    name="responsibilities"
                    placeholder="List the main responsibilities and duties (one per line)..."
                    value={form.responsibilities}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Qualifications
                  </label>
                  <textarea
                    name="qualifications"
                    placeholder="Education, certifications, and other requirements (one per line)..."
                    value={form.qualifications}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Skills
                  </label>
                  <textarea
                    name="skills"
                    placeholder="Technical and soft skills required (comma-separated or one per line)..."
                    value={form.skills}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Benefits & Perks
                  </label>
                  <textarea
                    name="benefits"
                    placeholder="Health insurance, 401k, remote work, professional development, etc..."
                    value={form.benefits}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                Contact Information
              </h3>
              <div className="ml-11">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="contactEmail"
                    type="email"
                    placeholder="hr@company.com"
                    value={form.contactEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Applications will be sent to this email address</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-8 py-6 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              <span className="text-red-500">*</span> Required fields
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30"
              >
                Post Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}