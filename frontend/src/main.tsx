import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

<Toaster position="top-right" />


createRoot(document.getElementById("root")!).render(<App />);
