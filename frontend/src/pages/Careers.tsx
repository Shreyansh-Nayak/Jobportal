import React from "react";
import { Briefcase, MapPin, Clock, Mail, ArrowRight, Users, Rocket, Heart } from "lucide-react";

type JobOpening = {
  title: string;
  type: string;
  location: string;
  description: string;
  skills?: string[];
};

const openings: JobOpening[] = [
  {
    title: "Frontend Developer",
    type: "Full-Time",
    location: "Remote / India",
    description:
      "Work with React, TypeScript, Tailwind CSS to build intuitive job seeker interfaces and employer dashboards.",
    skills: ["React", "TypeScript", "Tailwind CSS", "REST APIs"]
  },
  {
    title: "Backend Developer",
    type: "Full-Time",
    location: "Pune, India",
    description: "Design and maintain scalable APIs, manage database schema and build job-matching logic.",
    skills: ["Node.js", "PostgreSQL", "API Design", "Cloud Services"]
  },
  {
    title: "Product Manager",
    type: "Full-Time",
    location: "Remote",
    description:
      "Define product vision, roadmaps, work closely with engineering & design to deliver features users love.",
    skills: ["Product Strategy", "User Research", "Agile", "Analytics"]
  },
];

const benefits = [
  { icon: <Heart className="w-6 h-6" />, title: "Health Insurance", desc: "Comprehensive coverage for you and family" },
  { icon: <Rocket className="w-6 h-6" />, title: "Growth Opportunities", desc: "Continuous learning and career development" },
  { icon: <Users className="w-6 h-6" />, title: "Great Team", desc: "Work with talented, mission-driven people" },
  { icon: <MapPin className="w-6 h-6" />, title: "Flexible Location", desc: "Remote-first culture with office options" },
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Briefcase className="w-5 h-5" />
            <span className="font-medium">Join Our Team</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Build the Future of Job Matching
          </h1>
          
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Be part of a mission-driven team that's transforming how people find their dream careers.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Work With Us?</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Open Positions */}
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Open Positions</h2>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          {openings.map((job, idx) => (
            <div
              key={idx}
              className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-border"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">{job.title}</h2>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">{job.description}</p>
              
              {job.skills && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-muted-foreground/10 text-muted-foreground rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <button
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg text-white font-semibold rounded-lg transition-all hover:scale-105"
                onClick={() => {
                  alert(`Apply for ${job.title}`);
                }}
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Don't See Your Role?</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            We're always looking for talented people. Send us your resume and let's talk!
          </p>
          <a 
            href="mailto:careers@jobkonnect.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            careers@jobkonnect.com
          </a>
        </div>
      </div>
    </div>
  );
}