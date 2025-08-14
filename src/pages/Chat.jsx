import ChatBox from "../components/ChatBox";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Chat = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Header */}
      <header className="fixed z-30 w-full bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm py-4 px-2 sm:px-8 flex items-center justify-between">
        {/* Back Button & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-blue-100 transition"
            title="Back"
          >
            <ArrowLeft className="w-6 h-6 text-blue-700" />
          </button>
          <h1 className="text-xl sm:text-2xl font-extrabold text-blue-800 flex items-center gap-2">
            <span role="img" aria-label="stethoscope">
              🩺
            </span>
            Symptom Checker
          </h1>
        </div>
        {/* MediLink AI Brand on far right */}
        <Link
          to="/"
          className="text-lg xs:text-xl sm:text-2xl font-extrabold text-blue-700 flex items-center gap-1 sm:gap-2"
          style={{ pointerEvents: "auto" }}
        >
          <img
            src="/MediLink-Logo.png"
            alt="MediLink AI Logo"
            className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
            draggable={false}
          />
          MediLink <span className="text-blue-400">AI</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start md:pt-28 pt-20 pb-8 px-2 sm:px-4 md:px-8 overflow-y-auto w-full">
        <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl border border-blue-100 p-0 sm:p-4 flex flex-col min-h-[500px]">
          <div className="mb-4 border-b border-blue-100 pb-2 px-4 pt-4">
            <h2 className="text-lg sm:text-xl font-bold text-blue-700 flex items-center gap-2">
              <span role="img" aria-label="ai">
                🤖
              </span>
              AI Symptom Assistant
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Describe your symptoms below and get instant, AI-powered health
              insights. For emergencies, please contact a healthcare
              professional directly.
            </p>
          </div>
          <div className="flex-1 flex flex-col">
            <ChatBox />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
