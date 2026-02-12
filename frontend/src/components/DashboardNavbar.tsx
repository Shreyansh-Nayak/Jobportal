import { useState } from "react";
import { Menu, LogOut, User, FileText, HelpCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "@/utils/logout";

export default function DashboardNavbar() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isEmployerPath = location.pathname.startsWith("/employer-dashboard");

  const navItems = [
    { label: "Profile", icon: User, path: "/jobseeker/profile" },
    { label: "Resume", icon: FileText, path: "/resume" },
    { label: "FAQ's", icon: HelpCircle, path: "/faq" },
  ];

  const handleNav = (path: string, label: string) => {
    setActiveTab(label);
    navigate(path);
  };

  const handleLogoClick = () => {
    if (isEmployerPath) {
      navigate("/employer-dashboard");
    } else {
      navigate("/seeker-dashboard");
    }
  };

  return (
    <nav className="w-full h-16 bg-white border-b flex items-center justify-between px-6">
      <h1
        className="text-xl font-bold text-blue-600 cursor-pointer tracking-tight"
        onClick={handleLogoClick}
      >
        Job<span className="text-gray-800">Konnect</span>
      </h1>

      <div className="flex gap-1">
        {!isEmployerPath && navItems.map(({ label, icon: Icon, path }) => (
          <button
            key={label}
            onClick={() => handleNav(path, label)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
              ${activeTab === label
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }
            `}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg">
            <button
              onClick={logout}
              className="w-full px-4 py-3 flex items-center gap-2 text-red-600 hover:bg-red-50 rounded-xl"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}