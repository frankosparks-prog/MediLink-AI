import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserCircle, LogOut, ArrowLeft } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Define titles & icons for special subpages
  const pageConfigs = {
    "/bookdoctor": { title: "Book a Doctor", icon: "🩺" },
    "/ordermedication": { title: "Order Medication", icon: "💊" },
    "/appointments": { title: "Appointments", icon: "📅" },
    "/chatbox": { title: "Symptom Checker", icon: "🩻" },
  };

  const currentPage = pageConfigs[location.pathname];

  // Shared styles for all navbars
  const navClass =
    "fixed z-30 w-full bg-white/80 backdrop-blur border-b border-blue-100 shadow-lg py-3 px-2 sm:px-8 flex items-center justify-between";
  const brandClass =
    "flex items-center gap-2 font-extrabold text-blue-700 drop-shadow-sm";
  const logoClass = "w-7 h-7 sm:w-9 sm:h-9 object-contain drop-shadow";
  const buttonClass =
    "rounded-lg font-semibold shadow hover:scale-105 transition-all duration-150";

  // CASE 1: Sub-page with Back Button
  if (currentPage) {
    return (
      <header className={navClass}>
        {/* Back Button & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-blue-100 transition"
            title="Back"
          >
            <ArrowLeft className="w-6 h-6 text-blue-700" />
          </button>
          <h1 className="text-xl sm:text-2xl font-extrabold text-blue-800 flex items-center gap-2 drop-shadow">
            <span>{currentPage.icon}</span>
            {currentPage.title}
          </h1>
        </div>

        {/* Brand */}
        <span className={`${brandClass} text-lg xs:text-xl sm:text-2xl`}>
          <img
            src="/MediLink-Logo.png"
            alt="MediLink AI Logo"
            className={logoClass}
            draggable={false}
          />
          MediLink <span className="text-blue-400">AI</span>
        </span>
      </header>
    );
  }

  // CASE 2: Logged in (Dashboard Navbar)
  if (user) {
    return (
      <header className={navClass}>
        {/* Welcome */}
        <button
          className="flex-shrink-0"
          onClick={() => navigate("/dashboard")}
        >
          <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl font-extrabold text-blue-800 flex items-center gap-2 rounded bg-blue-100/70 hover:bg-blue-200/80 px-3 py-1 shadow transition-all">
            👋 <span className="hidden sm:inline">Welcome,</span> {user.username}
          </h1>
        </button>

        {/* Brand */}
        <span className={`${brandClass} absolute left-1/2 -translate-x-1/2 text-lg xs:text-xl sm:text-2xl`}>
          <img
            src="/MediLink-Logo.png"
            alt="MediLink AI Logo"
            className={logoClass}
            draggable={false}
          />
          MediLink <span className="text-blue-400">AI</span>
        </span>

        {/* Profile & Logout */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => navigate("/profile")}
            className={`flex items-center gap-2 bg-white/80 border border-blue-200 text-blue-700 px-3 py-1 sm:px-4 sm:py-2 ${buttonClass} text-sm sm:text-base`}
          >
            <UserCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="hidden md:inline">Profile</span>
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/auth");
            }}
            className={`bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 sm:px-5 sm:py-2 ${buttonClass} flex items-center gap-1 text-sm sm:text-base`}
          >
            <LogOut size={16} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </header>
    );
  }

  // CASE 3: Logged out (Default Navbar)
  return (
    <header className={navClass}>
      <nav className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link
          to="/"
          className={`${brandClass} text-2xl sm:text-3xl`}
        >
          <img
            src="/MediLink-Logo.png"
            alt="MediLink AI Logo"
            className={logoClass}
            draggable={false}
          />
          MediLink <span className="text-blue-400">AI</span>
        </Link>
        <div className="space-x-2 sm:space-x-4 flex items-center">
          <Link
            to="/auth"
            className={`bg-gradient-to-r from-blue-600 to-blue-400 text-white px-5 py-2 ${buttonClass}`}
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;