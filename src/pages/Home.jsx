import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Scroll } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-blue-200 to-purple-100">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center py-24 px-6 overflow-hidden">
          {/* Decorative Background Blobs */}
          <div className="absolute -top-16 -left-16 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-[120px] -z-10 animate-pulse" />
          <div className="absolute bottom-0 -right-16 w-96 h-96 bg-purple-300 opacity-20 rounded-full blur-[120px] -z-10 animate-pulse" />

          <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-blue-100 p-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 leading-tight drop-shadow mb-6">
              Welcome to <span className="text-indigo-700">MediLink AI</span> 💊
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 font-medium">
              Your intelligent health companion. Describe your symptoms to get smart suggestions, learn about medications, or connect with a medical expert instantly.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:from-blue-800 hover:to-indigo-700 transition-all text-lg"
              >
                Get Started
              </Link>
              <Link
                to="/auth"
                className="bg-white/70 border border-indigo-500 text-indigo-700 px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-50 transition-all text-lg"
              >
                Login
              </Link>
            </div>
          </div>
        </section>

        {/* AI Symptom Checker Section */}
        <section className="py-2 bg-gradient-to-t from-white via-blue-50 to-transparent">
          <h2 className="text-center text-3xl font-bold text-blue-800 mb-8 drop-shadow">
            Try the AI Symptom Checker <span className="align-middle">👇</span>
          </h2>
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100 p-6">
              <ChatBox />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;