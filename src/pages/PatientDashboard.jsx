import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserCircle, LogOut } from "lucide-react";
import Footer from "../components/Footer";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout || (() => {});

  // Uncomment this for auth protection
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/auth");
  //   }
  // }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col">
      {/* Header */}
      <header className="fixed z-30 w-full bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm py-4 px-8 flex items-center justify-between">
      <button onClick={() => navigate("/")}>
        <h1 className="text-xl md:text-2xl font-extrabold text-blue-800 flex items-center gap-2">
          <span role="img" aria-label="wave">👋</span>
          Welcome, {user?.name || "Patient"}
        </h1>
      </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 bg-white/70 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-50 transition-all"
            title="Profile"
          >
            <UserCircle className="w-6 h-6" />
            <span className="hidden sm:inline">Profile</span>
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/auth");
            }}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-pink-600 transition-all flex items-center gap-1"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100 p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">Your Health Dashboard</h2>
          <p className="mb-6 text-gray-700 text-lg">
            Manage your health, appointments, and consultations all in one place.
          </p>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow flex flex-col items-start">
              <span className="text-2xl mb-2">💡</span>
              <p className="font-semibold text-blue-800 mb-1">Check Symptoms with AI</p>
              <span className="text-gray-600 text-sm">Describe your symptoms and get instant insights.</span>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-all text-sm">
                Start Symptom Checker
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 shadow flex flex-col items-start">
              <span className="text-2xl mb-2">👨‍⚕️</span>
              <p className="font-semibold text-purple-800 mb-1">Book a Doctor</p>
              <span className="text-gray-600 text-sm">Find and book appointments with top doctors.</span>
              <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-purple-700 transition-all text-sm">
                Book Now
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow flex flex-col items-start">
              <span className="text-2xl mb-2">💊</span>
              <p className="font-semibold text-green-800 mb-1">Order Medication</p>
              <span className="text-gray-600 text-sm">Easily order and track your prescriptions.</span>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition-all text-sm">
                Order Now
              </button>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 shadow flex flex-col items-start">
              <span className="text-2xl mb-2">📅</span>
              <p className="font-semibold text-yellow-800 mb-1">Upcoming Appointments</p>
              <span className="text-gray-600 text-sm">View and manage your upcoming visits.</span>
              <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-600 transition-all text-sm">
                View Appointments
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientDashboard;