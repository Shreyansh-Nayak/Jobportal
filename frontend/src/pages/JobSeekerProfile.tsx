// Job Seeker Profile Section – React (Dashboard Ready)
// API Integrated Version
// Firebase Auth + JWT Integrated
// Assumes: React + TailwindCSS + shadcn/ui

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
// ... (rest of imports should remain)
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Folder,
  Settings,
  Link as LinkIcon,
  ShieldCheck,
  Layers,
  Compass,
  Save,
  Phone,
  MapPin,
  Github,
  Plus
} from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL as string;

type AnyObject = Record<string, any>;

/* -------------------- MAIN PROFILE PAGE -------------------- */
export default function SeekerProfile() {
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [profile, setProfile] = useState<AnyObject | null>(null);
  const [completion, setCompletion] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const calculateCompletion = (profileData: AnyObject | null) => {
    if (!profileData) return 0;

    const sections = {
      basicInfo: !!profileData.basicInfo?.fullName && !!profileData.basicInfo?.phone,
      summary: !!profileData.summary?.about,
      resume: !!profileData.resume,
      skills: profileData.skills?.length > 0,
      education: profileData.education?.length > 0,
      experience: profileData.experience?.length > 0,
      projects: profileData.projects?.length > 0,
      preferences: !!profileData.preferences?.role,
      links: !!profileData.links?.github || !!profileData.links?.linkedin,
    };

    const completed = Object.values(sections).filter(Boolean).length;
    const total = Object.keys(sections).length;
    return Math.round((completed / total) * 100);
  };

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/profile");
      setProfile(res.data);
      setCompletion(calculateCompletion(res.data));
    } catch (err) {
      console.error("fetchProfile error", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        fetchProfile();
      }
    });
    return () => unsubscribe();
  }, [fetchProfile]);

  const updateProfileSection = async (updates: AnyObject) => {
    try {
      const res = await api.post("/profile", updates);
      setProfile(res.data);
      setCompletion(calculateCompletion(res.data));
    } catch (err) {
      console.error("updateProfileSection error", err);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  if (!profile) return <div>Failed to load profile.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} completion={completion} />

        <div className="col-span-12 lg:col-span-9 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === "basic" && <BasicInfo data={profile.basicInfo} onUpdate={(d) => updateProfileSection({ basicInfo: d })} />}
          {activeTab === "summary" && <ProfessionalSummary data={profile.summary} onUpdate={(d) => updateProfileSection({ summary: d })} />}
          {activeTab === "resume" && <ResumeSection onUpdate={(url) => updateProfileSection({ resume: url })} />}
          {activeTab === "skills" && <SkillsSection data={profile.skills} onUpdate={(s) => updateProfileSection({ skills: s })} />}
          {activeTab === "education" && <EducationSection data={profile.education} onUpdate={(e) => updateProfileSection({ education: e })} />}
          {activeTab === "experience" && <ExperienceSection data={profile.experience} onUpdate={(e) => updateProfileSection({ experience: e })} />}
          {activeTab === "projects" && <ProjectsSection data={profile.projects} onUpdate={(p) => updateProfileSection({ projects: p })} />}
          {activeTab === "preferences" && <JobPreferences data={profile.preferences} onUpdate={(p) => updateProfileSection({ preferences: p })} />}
          {activeTab === "links" && <SocialLinks data={profile.links} onUpdate={(l) => updateProfileSection({ links: l })} />}
          {activeTab === "privacy" && <PrivacySettings data={profile.privacySettings} onUpdate={(s) => updateProfileSection({ privacySettings: s })} />}
        </div>
      </div>
    </div>
  );
}

/* -------------------- SIDEBAR -------------------- */
function ProfileSidebar({ activeTab, setActiveTab, completion }: { activeTab: string; setActiveTab: (t: string) => void; completion: number }) {
  const tabs = [
    { id: "basic", label: "Basic Info", icon: User },
    { id: "summary", label: "Professional Summary", icon: FileText },
    { id: "resume", label: "Resume / CV", icon: Layers },
    { id: "skills", label: "Key Skills", icon: Compass },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Folder },
    { id: "preferences", label: "Job Preferences", icon: Settings },
    { id: "links", label: "Social Links", icon: LinkIcon },
    { id: "privacy", label: "Privacy & Security", icon: ShieldCheck },
  ];

  return (
    <Card className="col-span-12 lg:col-span-3 border-none shadow-elegant bg-card/50 backdrop-blur-sm sticky top-6 self-start">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold">Your Profile</CardTitle>
        <CardDescription>Keep your profile updated to get better opportunities.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        <div className="space-y-2 px-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Completion</span>
            <span className="text-primary">{completion}%</span>
          </div>
          <Progress value={completion} className="h-2" />
        </div>

        <Separator className="opacity-50" />

        <div className="space-y-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${isActive
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
              >
                <Icon size={18} className={isActive ? 'text-primary-foreground' : 'text-primary/70'} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------- BASIC INFO -------------------- */
function BasicInfo({ data, onUpdate }: { data: AnyObject; onUpdate: (d: AnyObject) => void }) {
  const [form, setForm] = useState<AnyObject>(() => data ?? { fullName: "", phone: "", location: "" });

  useEffect(() => {
    setForm(data ?? { fullName: "", phone: "", location: "" });
  }, [data]);

  const save = async () => {
    onUpdate(form);
  };

  return (
    <Card className="border-none shadow-elegant overflow-hidden">
      <CardHeader className="bg-primary/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <User size={24} />
          </div>
          <div>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Your personal details and contact information.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-semibold">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
              <Input
                id="fullName"
                className="pl-10"
                placeholder="John Doe"
                value={form.fullName || ""}
                onChange={e => setForm({ ...form, fullName: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
              <Input
                id="phone"
                className="pl-10"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone || ""}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="col-span-full space-y-2">
            <Label htmlFor="location" className="text-sm font-semibold">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
              <Input
                id="location"
                className="pl-10"
                placeholder="City, Country"
                value={form.location || ""}
                onChange={e => setForm({ ...form, location: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <Button onClick={save} className="gap-2 px-8 shadow-glow transition-smooth hover:scale-105">
            <Save size={18} />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------- SUMMARY -------------------- */
function ProfessionalSummary({ data, onUpdate }: { data: AnyObject; onUpdate: (d: AnyObject) => void }) {
  const [summary, setSummary] = useState<AnyObject>(() => data ?? { headline: "", about: "" });

  useEffect(() => {
    setSummary(data ?? { headline: "", about: "" });
  }, [data]);

  const save = async () => {
    onUpdate(summary);
  };

  return (
    <Card className="border-none shadow-elegant overflow-hidden">
      <CardHeader className="bg-primary/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <FileText size={24} />
          </div>
          <div>
            <CardTitle>Professional Summary</CardTitle>
            <CardDescription>Highlight your key achievements and career goals.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6 pt-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="headline" className="text-sm font-semibold">Headline</Label>
            <Input
              id="headline"
              placeholder="e.g. Senior Software Engineer with 5+ years of experience"
              value={summary.headline || ""}
              onChange={e => setSummary({ ...summary, headline: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="about" className="text-sm font-semibold">About Me</Label>
            <Textarea
              id="about"
              placeholder="Write a brief introduction about yourself..."
              className="min-h-[150px] resize-none text-base"
              value={summary.about || ""}
              onChange={e => setSummary({ ...summary, about: e.target.value })}
            />
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <Button onClick={save} className="gap-2 px-8 shadow-glow transition-smooth hover:scale-105">
            <Save size={18} />
            Save Summary
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------- RESUME -------------------- */
function ResumeSection({ onUpdate }: { onUpdate: (url: string) => void }) {
  const [resume, setResume] = useState<File | null>(null);

  const uploadResume = async () => {
    if (!resume) return;
    try {
      // Placeholder: In a real app, you'd upload to S3/Cloudinary and get a URL
      // For now, we'll simulate by sending the filename
      console.log("Upload resume:", resume.name);
      onUpdate(resume.name);
      setResume(null);
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  return (
    <Card className="border-none shadow-elegant overflow-hidden">
      <CardHeader className="bg-primary/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Layers size={24} />
          </div>
          <div>
            <CardTitle>Resume / CV</CardTitle>
            <CardDescription>Upload your latest resume to apply for jobs.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6 pt-8">
        <div className="border-2 border-dashed border-muted rounded-xl p-12 flex flex-col items-center justify-center gap-4 bg-muted/30 transition-smooth hover:bg-muted/50 group">
          <div className="p-4 bg-background rounded-full shadow-sm text-muted-foreground group-hover:text-primary transition-colors">
            <FileText size={40} />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX (Max 10MB)</p>
          </div>
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={e => setResume(e.target.files?.[0] || null)}
            className="hidden"
            id="resume-upload"
          />
          <Label
            htmlFor="resume-upload"
            className="cursor-pointer bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-medium shadow-glow hover:scale-105 transition-smooth"
          >
            Select File
          </Label>
          {resume && (
            <div className="mt-4 flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-xs font-medium text-primary animate-in fade-in zoom-in duration-300">
              <FileText size={14} />
              {resume.name}
              <button onClick={() => setResume(null)} className="ml-2 hover:text-destructive transition-colors">×</button>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={uploadResume}
            disabled={!resume}
            className="gap-2 px-12 shadow-glow transition-smooth hover:scale-105"
          >
            <Plus size={18} />
            Upload Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------- SKILLS -------------------- */
function SkillsSection({ data, onUpdate }: { data?: AnyObject[]; onUpdate: (s: AnyObject[]) => void }) {
  const [skills, setSkills] = useState<AnyObject[]>(() => data ?? []);
  const [skill, setSkill] = useState<string>("");

  useEffect(() => setSkills(data ?? []), [data]);

  const addSkill = async () => {
    if (!skill.trim()) return;
    const newSkills = [...skills, { name: skill.trim() }];
    onUpdate(newSkills);
    setSkill("");
  };

  const removeSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    onUpdate(newSkills);
  };

  return (
    <Card className="border-none shadow-elegant overflow-hidden">
      <CardHeader className="bg-primary/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Compass size={24} />
          </div>
          <div>
            <CardTitle>Key Skills</CardTitle>
            <CardDescription>Add skills that showcase your expertise.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6 pt-8">
        <div className="flex gap-3">
          <Input
            className="flex-1"
            value={skill}
            onChange={e => setSkill(e.target.value)}
            placeholder="e.g. React, Node.js, Project Management"
            onKeyDown={e => e.key === 'Enter' && addSkill()}
          />
          <Button onClick={addSkill} className="gap-2 transition-smooth shadow-glow">
            <Plus size={18} />
            Add
          </Button>
        </div>

        <div className="pt-2">
          <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Your Skills</Label>
          <div className="flex gap-2 flex-wrap mt-4">
            {skills.length > 0 ? (
              skills.map((s, i) => (
                <Badge key={i} variant="secondary" className="px-3 py-2 text-sm font-medium bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors cursor-default relative group">
                  {s.name}
                  <button
                    onClick={() => removeSkill(i)}
                    className="ml-2 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </Badge>
              ))
            ) : (
              <div className="w-full py-8 border border-dashed border-muted rounded-lg flex flex-col items-center justify-center text-muted-foreground bg-muted/10">
                <Compass size={32} className="opacity-20 mb-2" />
                <p className="text-sm italic">No skills added yet. Start by adding one above!</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------- EDUCATION -------------------- */
function EducationSection({ data, onUpdate }: { data?: AnyObject[]; onUpdate: (e: AnyObject[]) => void }) {
  const [items, setItems] = useState<AnyObject[]>(() => data ?? []);
  const [edu, setEdu] = useState<AnyObject>({ degree: "", institution: "" });

  useEffect(() => setItems(data ?? []), [data]);

  const add = async () => {
    if (!edu.degree || !edu.institution) return;
    const newItems = [...items, edu];
    onUpdate(newItems);
    setEdu({ degree: "", institution: "" });
  };

  const remove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onUpdate(newItems);
  };

  return (
    <Card className="border-none shadow-elegant overflow-hidden">
      <CardHeader className="bg-primary/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <GraduationCap size={24} />
          </div>
          <div>
            <CardTitle>Education</CardTitle>
            <CardDescription>Details about your academic background.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="degree" className="text-sm font-semibold">Degree / Field of Study</Label>
            <Input
              id="degree"
              placeholder="e.g. Bachelor of Technology in CS"
              value={edu.degree}
              onChange={e => setEdu({ ...edu, degree: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="institution" className="text-sm font-semibold">Institution / University</Label>
            <Input
              id="institution"
              placeholder="e.g. IIT Bombay"
              value={edu.institution}
              onChange={e => setEdu({ ...edu, institution: e.target.value })}
            />
          </div>
        </div>
        <div className="pt-2 flex justify-end">
          <Button onClick={add} className="gap-2 px-8 shadow-glow transition-smooth hover:scale-105">
            <Plus size={18} />
            Add Education
          </Button>
        </div>

        {data && data.length > 0 && (
          <div className="mt-8 space-y-4">
            <Separator className="opacity-50" />
            <div className="space-y-3">
              {data.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-muted bg-muted/10">
                  <div className="p-2 bg-background rounded-lg border border-muted text-primary">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base">{item.degree}</h4>
                    <p className="text-sm text-muted-foreground">{item.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* -------------------- EXPERIENCE -------------------- */
function ExperienceSection({ data, onUpdate }: { data?: AnyObject[]; onUpdate: (e: AnyObject[]) => void }) {
  const [items, setItems] = useState<AnyObject[]>(() => data ?? []);
  const [exp, setExp] = useState<AnyObject>({ title: "", company: "" });

  useEffect(() => setItems(data ?? []), [data]);

  const add = async () => {
    if (!exp.title || !exp.company) return;
    const newItems = [...items, exp];
    onUpdate(newItems);
    setExp({ title: "", company: "" });
  };

  const remove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onUpdate(newItems);
  };

  return (
    <Card className="border-none shadow-elegant overflow-hidden">
      <CardHeader className="bg-primary/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Briefcase size={24} />
          </div>
          <div>
            <CardTitle>Work Experience</CardTitle>
            <CardDescription>Details about your previous and current roles.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-sm font-semibold">Job Title</Label>
            <Input
              id="jobTitle"
              placeholder="e.g. Senior Frontend Developer"
              value={exp.title}
              onChange={e => setExp({ ...exp, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-semibold">Company</Label>
            <Input
              id="company"
              placeholder="e.g. Google India"
              value={exp.company}
              onChange={e => setExp({ ...exp, company: e.target.value })}
            />
          </div>
        </div>
        <div className="pt-2 flex justify-end">
          <Button onClick={add} className="gap-2 px-8 shadow-glow transition-smooth hover:scale-105">
            <Plus size={18} />
            Add Experience
          </Button>
        </div>

        {data && data.length > 0 && (
          <div className="mt-8 space-y-4">
            <Separator className="opacity-50" />
            <div className="space-y-3">
              {data.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-muted bg-muted/10">
                  <div className="p-2 bg-background rounded-lg border border-muted text-primary">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* -------------------- PROJECTS -------------------- */
function ProjectsSection({ data, onUpdate }: { data?: AnyObject[]; onUpdate: (p: AnyObject[]) => void }) {
  const [items, setItems] = useState<AnyObject[]>(() => data ?? []);
  const [proj, setProj] = useState<AnyObject>({ title: "", description: "" });

  useEffect(() => setItems(data ?? []), [data]);

  const add = async () => {
    if (!proj.title || !proj.description) return;
    const newItems = [...items, proj];
    onUpdate(newItems);
    setProj({ title: "", description: "" });
  };

  const remove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onUpdate(newItems);
  };

  return (
    <Card className="border-none shadow-elegant overflow-hidden">
      <CardHeader className="bg-primary/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Folder size={24} />
          </div>
          <div>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Showcase your best work and personal projects.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6 pt-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projTitle" className="text-sm font-semibold">Project Title</Label>
            <Input
              id="projTitle"
              placeholder="e.g. AI-Powered Portfolio"
              value={proj.title}
              onChange={e => setProj({ ...proj, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projDesc" className="text-sm font-semibold">Project Description</Label>
            <Textarea
              id="projDesc"
              placeholder="Briefly describe the project, tech stack, and your role..."
              className="min-h-[100px] resize-none"
              value={proj.description}
              onChange={e => setProj({ ...proj, description: e.target.value })}
            />
          </div>
        </div>
        <div className="pt-2 flex justify-end">
          <Button onClick={add} className="gap-2 px-8 shadow-glow transition-smooth hover:scale-105">
            <Plus size={18} />
            Add Project
          </Button>
        </div>

        {data && data.length > 0 && (
          <div className="mt-8 space-y-4">
            <Separator className="opacity-50" />
            <div className="space-y-4">
              {data.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-muted bg-muted/10 group transition-smooth hover:bg-muted/20">
                  <div className="p-3 bg-background rounded-lg border border-muted text-primary group-hover:scale-110 transition-smooth">
                    <Folder size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* -------------------- JOB PREF -------------------- */
function JobPreferences({ data, onUpdate }: { data: AnyObject; onUpdate: (p: AnyObject) => void }) {
  const [pref, setPref] = useState<AnyObject>(() => data ?? { role: "" });

  useEffect(() => setPref(data ?? { role: "" }), [data]);

  const save = async () => {
    onUpdate(pref);
  };
  bitumen

  return (
    <Card className="border-none shadow-elegant overflow-hidden">
      <CardHeader className="bg-primary/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Settings size={24} />
          </div>
          <div>
            <CardTitle>Job Preferences</CardTitle>
            <CardDescription>Tell us what kind of roles you are looking for.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6 pt-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prefRole" className="text-sm font-semibold">Preferred Job Role</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
              <Input
                id="prefRole"
                className="pl-10"
                placeholder="e.g. Full Stack Developer, Product Manager"
                value={pref?.role || ""}
                onChange={e => setPref({ ...pref, role: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <Button onClick={save} className="gap-2 px-8 shadow-glow transition-smooth hover:scale-105">
            <Save size={18} />
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------- LINKS -------------------- */
function SocialLinks({ data, onUpdate }: { data: AnyObject; onUpdate: (l: AnyObject) => void }) {
  const [links, setLinks] = useState<AnyObject>(() => data ?? { github: "", linkedin: "", portfolio: "" });

  useEffect(() => setLinks(data ?? { github: "", linkedin: "", portfolio: "" }), [data]);

  const save = async () => {
    onUpdate(links);
  };

  return (
    <Card className="border-none shadow-elegant overflow-hidden">
      <CardHeader className="bg-primary/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <LinkIcon size={24} />
          </div>
          <div>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>Connect your professional profiles.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6 pt-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github" className="text-sm font-semibold">GitHub Profile URL</Label>
            <div className="relative">
              <Github className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
              <Input
                id="github"
                className="pl-10"
                placeholder="https://github.com/yourusername"
                value={links?.github || ""}
                onChange={e => setLinks({ ...links, github: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <Button onClick={save} className="gap-2 px-8 shadow-glow transition-smooth hover:scale-105">
            <Save size={18} />
            Save Links
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------- PRIVACY -------------------- */
function PrivacySettings({ data, refresh }: { data: AnyObject; refresh: () => void }) {
  const [privacy, setPrivacy] = useState<AnyObject>(() => data ?? { visibility: "Public" });

  useEffect(() => setPrivacy(data ?? { visibility: "Public" }), [data]);

  const save = async () => {
    try {
      console.log("Save privacy:", privacy);
      refresh();
    } catch (err) {
      console.error("Save error", err);
    }
  };

  return (
    <Card className="border-none shadow-elegant overflow-hidden">
      <CardHeader className="bg-primary/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <ShieldCheck size={24} />
          </div>
          <div>
            <CardTitle>Privacy & Visibility</CardTitle>
            <CardDescription>Control who can see your profile details.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6 pt-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="visibility" className="text-sm font-semibold">Profile Visibility</Label>
            <select
              id="visibility"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={privacy?.visibility || "Public"}
              onChange={e => setPrivacy({ ...privacy, visibility: e.target.value })}
            >
              <option>Public</option>
              <option>Recruiters Only</option>
              <option>Private</option>
            </select>
            <p className="text-xs text-muted-foreground mt-2 italic">
              * Public: Visible to all registered recruiters and members.
            </p>
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <Button onClick={save} className="gap-2 px-8 shadow-glow transition-smooth hover:scale-105">
            <Save size={18} />
            Update Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
