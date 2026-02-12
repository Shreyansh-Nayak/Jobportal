import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") return null;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="fixed top-6 left-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-elegant hover:bg-primary hover:text-white transition-smooth active:scale-95 group overflow-hidden"
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5 transition-smooth group-hover:-translate-x-0.5" />
    </button>
  );
}
