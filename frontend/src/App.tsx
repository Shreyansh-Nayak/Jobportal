import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import axios from "axios";
import Jobs from "./pages/Jobs";
import Front from "./pages/Front";
import Auth from "./pages/Auth";
import SeekerDashboard from "./pages/SeekerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";
import Careers from "./pages/Careers";
import Resume from "./pages/Resume";
import FAQ from "./pages/FAQ";
import ResumeScore from "@/components/ResumeScore";
import JobSeekerProfile from "./pages/JobSeekerProfile";
import "./App.css";
import { Navbar } from "./components/Navbar";

import BackButton from "./components/BackButton";

const queryClient = new QueryClient();

// ----------------- APP CONTENT -----------------
const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar on specific routes
 const hideNavbarRoutes = [
  "/auth",
  "/seeker-dashboard",
  "/employer-dashboard",
];

const shouldShowNavbar = !hideNavbarRoutes.some(route =>
  location.pathname.startsWith(route)
);


 useEffect(() => {
  const checkAuth = async () => {
const token = localStorage.getItem("token");

    const protectedRoutes = [
      "/seeker-dashboard",
      "/employer-dashboard",
    ];

    const isProtectedRoute = protectedRoutes.includes(location.pathname);

    // No token + protected route → redirect to auth
    if (!token && isProtectedRoute) {
      console.log("🔐 No token found, redirecting to auth");
      navigate("/auth");
      return;
    }

    // Token exists → validate
    if (token) {
      try {
        const response = await axios.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const role = response.data?.role;

        // Logged-in user should not stay on /auth
        if (location.pathname === "/auth") {
          navigate(
            role === "job_seeker"
              ? "/seeker-dashboard"
              : "/employer-dashboard"
          );
        }
      } catch (error) {
        console.log("❌ Token validation failed, clearing token");
        localStorage.removeItem("token");
        navigate("/auth");
      }
    }
  };

  checkAuth();
}, [navigate, location.pathname]);


  return (
    <>
      {shouldShowNavbar && <Navbar />}


      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/seeker-dashboard" element={<SeekerDashboard />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
         <Route path="/jobseeker/profile" element={<JobSeekerProfile />} />
        {/* <Route path="/resume-score" element={<ResumeScore />} /> */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

// ----------------- MAIN APP -----------------
const App = () => (
  <BrowserRouter>
   
      <BackButton />
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <SonnerToaster />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
