import { useState, FormEvent } from "react";
import { Briefcase, Search, Loader2, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { BsApple, BsLinkedin } from "react-icons/bs";
import { auth } from "@/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";


import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
console.log("API URL:", import.meta.env.VITE_API_BASE_URL);


export default function Auth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"job_seeker" | "employer" | null>(null);



  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/seeker-dashboard";



  useEffect(() => {
    const mode = searchParams.get("mode");
    const role = searchParams.get("role") as "job_seeker" | "employer" | null;

    if (mode === "signup") {
      setIsSignUp(true);

      if (role === "job_seeker" || role === "employer") {
        setSelectedRole(role);
      }
    }
  }, [searchParams]);


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: signUpData.email,
            password: signUpData.password,
            fullName: signUpData.fullName,
            role: selectedRole,
          }),
        }
      );

      if (res.ok) {
        console.log("Registered successfully");

      }


      toast.success("Account created successfully");
      navigate("/auth"); // or auto-login if you want
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };



  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: signInData.email,
            password: signInData.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to sign in");
      }

      // Store JWT
      localStorage.setItem("token", data.token);

      toast.success("Signed in successfully!");

      if (redirect) {
        navigate(redirect);
      } else {
        navigate(
          data.user.role === "job_seeker"
            ? "/seeker-dashboard"
            : "/employer-dashboard"
        );
      }

    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };


  const handleSocialSignUp = async () => {
    if (!selectedRole) {
      toast.error("Please select a role first");
      return;
    }

    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseToken = await result.user.getIdToken();

      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/auth/firebase-register`;
      console.log("Making signup request to:", apiUrl);

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseToken,
          role: selectedRole,
          mode: "signup",
        }),
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const err = await res.json();
        console.error("Auth error:", err);
        throw new Error(err.message);
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      navigate(
        selectedRole === "job_seeker"
          ? "/seeker-dashboard"
          : "/employer-dashboard"
      );

      toast.success("Account created with Google");
    } catch (err: any) {
      console.error("Firebase sign-up error:", err);
      toast.error(err.message || "Google sign-up failed");
    } finally {
      setIsLoading(false);
    }
  };




  // Handler for Social Auth during SIGN IN (does not require role)
  const handleSocialSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseToken = await result.user.getIdToken();

      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/auth/firebase-login`;
      console.log("Making request to:", apiUrl);

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseToken,
          mode: "login",
        }),
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const err = await res.json();
        console.error("Auth error:", err);
        throw new Error(err.message);
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      navigate(
        data.user.role === "job_seeker"
          ? "/seeker-dashboard"
          : "/employer-dashboard"
      );

      toast.success("Signed in with Google");
    } catch (err: any) {
      console.error("Firebase sign-in error:", err);
      toast.error(err.message || "Google sign-in failed");
    } finally {
      setIsLoading(false);
    }
  };



  // Handler for LinkedIn Auth during SIGN UP (requires role)
  //   const handleLinkedInSignUp = () => {
  //   if (!selectedRole) {
  //     toast.error("Please select a role first");
  //     return;
  //   }

  //   // Store role temporarily for post-OAuth user creation
  //   localStorage.setItem("pending_role", selectedRole);

  //   // Redirect to backend LinkedIn OAuth
  //   window.location.href =
  //     `${import.meta.env.VITE_API_URL}/api/auth/oauth/linkedin`;
  // };


  //   // Handler for LinkedIn Auth during SIGN IN (does not require role)
  //  const handleLinkedInSignIn = (): void => {
  //   // Redirect directly to backend LinkedIn OAuth
  //   window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/linkedin`;
  // };

  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <div className="relative w-full max-w-5xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[700px]">
            {/* Left Panel - Sign In/Sign Up Form */}

            <div className="w-full lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
              {!isSignUp ? (
                // Sign In Form

                <div className="max-w-md mx-auto w-full space-y-8">
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900">JobKonnect</h1>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Sign in to continue your journey</p>
                  </div>

                  {/* Social Auth Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleSocialSignIn}
                      className="w-full px-6 py-3.5 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      <FcGoogle size={24} />
                      <span className="font-medium text-gray-700 group-hover:text-blue-600">Continue with Google</span>
                    </button>


                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">Or continue with email</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={signInData.email}
                          onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                          required
                          className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          placeholder="Enter your password"
                          value={signInData.password}
                          onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                          required
                          className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                        <span className="text-gray-600">Remember me</span>
                      </label>
                      <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                        Forgot password?
                      </button>
                    </div>

                    <button
                      onClick={handleSignIn}
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      {isLoading ? <Loader2 className="animate-spin mx-auto" size={24} /> : "Sign In"}
                    </button>
                  </div>

                  <p className="text-center text-gray-600">
                    Don't have an account?{" "}
                    <button onClick={() => setIsSignUp(true)} className="text-blue-600 hover:text-blue-700 font-semibold">
                      Sign Up
                    </button>
                  </p>
                </div>
              ) : !selectedRole ? (
                // Role Selection
                <div className="max-w-md mx-auto w-full space-y-8">
                  <div className="text-center lg:text-left">
                    <button
                      onClick={() => setIsSignUp(false)}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Sign In</span>
                    </button>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Join JobKonnect</h2>
                    <p className="text-gray-600">Choose your role to get started</p>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => setSelectedRole("job_seeker")}
                      className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Search className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-left flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">Job Seeker</h3>
                          <p className="text-gray-600">Find your dream job and connect with top employers</p>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-blue-500 group-hover:bg-blue-500 transition-all"></div>
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedRole("employer")}
                      className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Briefcase className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-left flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">Employer</h3>
                          <p className="text-gray-600">Discover and hire the best talent for your team</p>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-blue-500 group-hover:bg-blue-500 transition-all"></div>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                // Sign Up Form
                <div className="max-w-md mx-auto w-full space-y-8">
                  <div className="text-center lg:text-left">
                    <button
                      onClick={() => setSelectedRole(null)}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Change role</span>
                    </button>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h2>
                    <p className="text-gray-600">
                      Sign up as a {selectedRole === "job_seeker" ? "Job Seeker" : "Employer"}
                    </p>
                  </div>

                  {/* Social Auth Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleSocialSignUp}
                      className="w-full px-6 py-3.5 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      <FcGoogle size={24} />
                      <span className="font-medium text-gray-700 group-hover:text-blue-600">Continue with Google</span>
                    </button>

                    {/* <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleSocialSignUp("apple")}
                        className="px-6 py-3.5 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <BsApple size={22} className="text-gray-900" />
                        <span className="font-medium text-gray-700">Apple</span>
                      </button>
                      <button
                        onClick={handleLinkedInSignUp}
                        className="px-6 py-3.5 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <BsLinkedin size={22} className="text-[#0A66C2]" />
                        <span className="font-medium text-gray-700">LinkedIn</span>
                      </button>
                    </div> */}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">Or register with email</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={signUpData.fullName}
                          onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                          required
                          className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={signUpData.email}
                          onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                          required
                          className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          placeholder="Create a strong password"
                          value={signUpData.password}
                          onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                          required
                          className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" required className="w-5 h-5 mt-0.5 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                      <span className="text-sm text-gray-600">
                        I agree to the{" "}
                        <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                          Terms of Service
                        </button>{" "}
                        and{" "}
                        <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                          Privacy Policy
                        </button>
                      </span>
                    </label>

                    <button
                      onClick={handleSignUp}
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      {isLoading ? <Loader2 className="animate-spin mx-auto" size={24} /> : "Create Account"}
                    </button>
                  </div>

                  <p className="text-center text-gray-600">
                    Already have an account?{" "}
                    <button onClick={() => { setIsSignUp(false); setSelectedRole(null); }} className="text-blue-600 hover:text-blue-700 font-semibold">
                      Sign In
                    </button>
                  </p>
                </div>
              )}
            </div>

            {/* Right Panel - Branding & Stats */}
            <div className="hidden lg:flex w-2/5 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-20 left-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl"></div>

              <div className="relative z-10 space-y-12 text-center">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                    <Briefcase className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold leading-tight">
                    {!isSignUp ? "Start Your Journey" : "Join Our Community"}
                  </h2>
                  <p className="text-blue-100 text-lg">
                    {!isSignUp
                      ? "Connect with top employers and discover opportunities that match your skills"
                      : "Over 100K+ professionals trust JobKonnect to advance their careers"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="text-4xl font-bold mb-2">100K+</div>
                    <div className="text-blue-100 text-sm">Active Users</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="text-4xl font-bold mb-2">50K+</div>
                    <div className="text-blue-100 text-sm">Job Listings</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="text-4xl font-bold mb-2">5K+</div>
                    <div className="text-blue-100 text-sm">Companies</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="text-4xl font-bold mb-2">95%</div>
                    <div className="text-blue-100 text-sm">Success Rate</div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/20">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-yellow-300 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-blue-100 italic">"The best platform for finding my dream job!"</p>
                  <p className="text-sm text-blue-200 mt-2">- Sarah Johnson, Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-8 py-3 shadow-lg flex items-center gap-3">
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white"></div>
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">Trusted by 100K+ professionals</span>
        </div>
      </div>
    </div>
  );
};

