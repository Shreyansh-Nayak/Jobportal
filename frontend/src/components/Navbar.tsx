import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




import { Button } from "@/components/ui/button";
import { Briefcase } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Code,
  TrendingUp,
  Headphones,
  Palette,
  Scale,
  Rocket,
  Building2,
  Zap,
  Users,
  BookOpen,
  MessageSquare,
  UserCircle,
  LogOut,
  LayoutDashboard
} from "lucide-react";
import logo from "@/assets/logo.png";
import { ThemeToggle } from "./ThemeToggle";
type User = {
  _id: string;
  email: string;
  role: string;
};


export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/auth");
  };



  const jobCategories = [
    { name: "Software Technologies", icon: Code },
    { name: "Marketing & Sales", icon: TrendingUp },
    { name: "Hardware Technologies", icon: Headphones },
    { name: "Design & Creative", icon: Palette },
    // { name: "Legal & Finance", icon: Scale },
    // { name: "Product Management", icon: Rocket },
  ];

  // const companyCategories = [
  //   { name: "Tech Companies", icon: Building2 },
  //   { name: "Startups", icon: Zap },
  //   { name: "Enterprise", icon: Building2 },
  //   { name: "Remote-First", icon: Users },

  // ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm text-foreground">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">

          {/* LEFT SECTION */}
          <div className="flex items-center space-x-10">

            {/* LOGO */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-10 h-10 mx-4 bg-gradient-to-br from-blue-600 to-[#2563eb] rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-[#2563eb]">JobKonnect</span>
            </div>

            {/* NAVIGATION LINKS */}
            <div className="flex items-center space-x-6 z-50">

              {/* JOBS DROPDOWN */}
              <div className="relative group">
                <button className="flex items-center hover:text-[#2563eb] transition-colors font-medium z-50">
                  Jobs
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>

                <div className="absolute top-full left-0 bg-card border border-border rounded-lg shadow-xl w-72 p-4 opacity-0 invisible 
                                group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <h3 className="font-semibold mb-3 text-[#2563eb]">Job Categories</h3>
                  <div className="space-y-1">
                    {jobCategories.map(({ name, icon: Icon }) => (
                      <div key={name}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground 
                                   cursor-pointer py-2 hover:bg-accent px-3 rounded-md transition-colors"
                      >
                        <Icon className="h-4 w-4 text-[#2563eb]" />
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* COMPANIES DROPDOWN */}
              {/* <div className="relative group">
                <button className="flex items-center hover:text-[#2563eb] transition-colors font-medium z-50">
                  Companies
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>

                <div className="absolute top-full left-0 bg-card border border-border rounded-lg shadow-xl w-64 p-4 opacity-0 invisible 
                                group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <h3 className="font-semibold mb-3 text-[#2563eb]">Company Categories</h3>
                  <div className="space-y-1">
                    {companyCategories.map(({ name, icon: Icon }) => (
                      <div key={name}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground 
                                   cursor-pointer py-2 hover:bg-accent px-3 rounded-md transition-colors"
                      >
                        <Icon className="h-4 w-4 text-[#2563eb]" />
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div> */}

              {/* PLAIN LINKS */}
              <button onClick={() => navigate("/careers")} className="hover:text-[#2563eb] font-medium">Career</button>
              <button onClick={() => navigate("/contact")} className="hover:text-[#2563eb] font-medium">Contact Us</button>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {!user ? (
              <>
                <Button variant="ghost" onClick={() => navigate("/auth")} className="hover:text-[#2563eb]">
                  Login
                </Button>
                <Button onClick={() => navigate("/auth")} className="bg-[#2563eb] hover:bg-cyan-500">
                  Post a Job
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center hover:text-[#2563eb]">
                    <UserCircle className="h-6 w-6 mr-2" />
                    My Account
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>

                  <DropdownMenuItem
                    onClick={() =>
                      navigate(
                        user?.role === "job_seeker"
                          ? "/seeker-dashboard"
                          : "/employer-dashboard"
                      )
                    }
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};
