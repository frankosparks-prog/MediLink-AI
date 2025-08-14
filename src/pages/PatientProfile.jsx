import {
  User,
  CalendarDays,
  Syringe,
  FileText,
  Edit3,
  UserCircle,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const mockMedicationData = [
  { date: "Aug 1", meds: 2 },
  { date: "Aug 5", meds: 1 },
  { date: "Aug 10", meds: 3 },
  { date: "Aug 15", meds: 2 },
  { date: "Aug 20", meds: 4 },
];

const symptomHistoryData = [
  { symptom: "Headache", count: 4 },
  { symptom: "Fever", count: 2 },
  { symptom: "Cough", count: 3 },
  { symptom: "Fatigue", count: 1 },
];

const treatmentSuccessRate = 85; // example percentage

const PatientProfile = () => {
  // const { user, logout } = useAuth();
  const auth = useAuth();
  const user = auth?.name;
  const logout = auth?.logout || (() => {});
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    fullName: user?.name || "John Doe",
    email: user?.email || "john@example.com",
    phone: "+254712345678",
    age: "28",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Header */}
      {/* <header className="fixed z-30 w-full bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm py-3 px-2 sm:py-4 sm:px-8 flex items-center justify-between">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex-shrink-0"
        >
          <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl font-extrabold text-blue-800 flex items-center gap-1 sm:gap-2 rounded bg-white/70 hover:bg-blue-50 transition-all px-2 py-1 shadow">
            <span role="img" aria-label="user">
              🧑
            </span>
            <span className="hidden xs:inline">Welcome,</span>
            <span>{user?.name || "Janex Wandera"}</span>
          </h1>
        </button>
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 text-lg xs:text-xl sm:text-2xl font-extrabold tracking-tight text-blue-700 flex items-center gap-1 sm:gap-2"
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
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-1 sm:gap-2 bg-white/70 border border-blue-200 text-blue-700 px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold shadow hover:bg-blue-50 transition-all text-sm sm:text-base"
            title="Profile"
          >
            <UserCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="hidden md:inline">Profile</span>
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/auth");
            }}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 sm:px-5 sm:py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-pink-600 transition-all flex items-center gap-1 text-sm sm:text-base"
          >
            <LogOut size={16} />{" "}
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </header> */}

      {/* Main content fills available space and stretches full width */}
      <main className="flex-1 flex flex-col items-center justify-start md:pt-28 pt-20 pb-8 px-2 sm:px-4 md:px-8 overflow-y-auto w-full">
        <div className="w-full px-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
              <User size={24} /> Your Profile
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
            {/* Profile Info */}
            <div className="bg-blue-100 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-blue-800">
                  Personal Information
                </h3>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Edit3 size={16} />
                  {editMode ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="space-y-3">
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  editMode={editMode}
                />
                <InputField
                  label="Email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  editMode={editMode}
                />
                <InputField
                  label="Phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  editMode={editMode}
                />
                <InputField
                  label="Age"
                  name="age"
                  value={profile.age}
                  onChange={handleChange}
                  editMode={editMode}
                />
              </div>
            </div>

            {/* Health Graph */}
            <div className="bg-blue-100 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <Syringe size={20} /> Medication Trend
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={mockMedicationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="meds"
                    stroke="#2563EB"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Symptom History Bar Chart */}
            <div className="bg-blue-100 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <FileText size={20} /> Symptom History
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={symptomHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="symptom" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Treatment Success Rate Circle */}
            <div className="bg-blue-100 rounded-lg p-4 flex flex-col items-center justify-center">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <Syringe size={20} /> Treatment Success Rate
              </h3>
              <div className="relative w-40 h-40">
                <svg className="w-full h-full">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#E0E7FF"
                    strokeWidth="15"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#10B981"
                    strokeWidth="15"
                    fill="none"
                    strokeDasharray="440"
                    strokeDashoffset={`${
                      440 - (440 * treatmentSuccessRate) / 100
                    }`}
                    strokeLinecap="round"
                    transform="rotate(-90 80 80)"
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-lg font-bold text-green-700">
                  {treatmentSuccessRate}%
                </div>
              </div>
            </div>
          </div>

          {/* Medication History */}
          <div className="mt-10">
            <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2 mb-4">
              <FileText size={20} /> Medication History
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Medication</th>
                    <th className="py-2 px-4 text-left">Dosage</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-2 px-4">Aug 5</td>
                    <td className="py-2 px-4">Amoxicillin</td>
                    <td className="py-2 px-4">500mg</td>
                    <td className="py-2 px-4">Completed</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2 px-4">Aug 15</td>
                    <td className="py-2 px-4">Ibuprofen</td>
                    <td className="py-2 px-4">200mg</td>
                    <td className="py-2 px-4">Ongoing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Appointments Section */}
          <div className="mt-10">
            <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2 mb-4">
              <CalendarDays size={20} /> Appointments
            </h3>
            <ul className="space-y-2">
              <li className="p-3 bg-white border-l-4 border-blue-600 shadow-sm rounded">
                Aug 10 - 11:00AM with Dr. Achieng (General Physician)
              </li>
              <li className="p-3 bg-white border-l-4 border-blue-600 shadow-sm rounded">
                Aug 22 - 2:00PM with Dr. Kamau (Dermatologist)
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

// Reusable input/display component
const InputField = ({ label, name, value, onChange, editMode }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    {editMode ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md mt-1"
      />
    ) : (
      <p className="mt-1 text-gray-700 font-medium">{value}</p>
    )}
  </div>
);

export default PatientProfile;
