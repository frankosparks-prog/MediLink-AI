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
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const mockMedicationData = [
  { date: "Aug 1", meds: 2 },
  { date: "Aug 5", meds: 1 },
  { date: "Aug 10", meds: 3 },
  { date: "Aug 15", meds: 2 },
  { date: "Aug 20", meds: 4 },
];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Header */}
      <header className="fixed z-30 w-full bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm py-4 px-8 flex items-center justify-between">
        <button onClick={() => navigate("/dashboard")}>
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
            <LogOut size={16} />Logout 
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 py-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
            <User size={24} /> Your Profile
          </h2>
          {/* <button
            onClick={handleLogout}
            className="text-red-600 flex items-center gap-1 hover:underline"
          >
            <LogOut size={16} /> Logout
          </button> */}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
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
        </div>

        {/* Medication History */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2 mb-4">
            <FileText size={20} /> Medication History
          </h3>
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
