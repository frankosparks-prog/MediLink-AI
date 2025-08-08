import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, Bell, History, RefreshCcw, FileText } from "lucide-react";
import Footer from "../components/Footer";

// Example appointment data
const sampleAppointments = [
  {
    id: 1,
    doctor: "Dr. Aisha Kamau",
    specialty: "Cardiologist",
    date: "2025-08-15",
    time: "10:00 AM",
    status: "Upcoming",
    notes: "Bring previous ECG results.",
  },
  {
    id: 2,
    doctor: "Dr. Peter Mwangi",
    specialty: "Dermatologist",
    date: "2025-07-20",
    time: "2:30 PM",
    status: "Completed",
    notes: "Follow up in 6 months.",
  },
  {
    id: 3,
    doctor: "Dr. Joy Wanjiku",
    specialty: "Pediatrician",
    date: "2025-06-10",
    time: "11:00 AM",
    status: "Cancelled",
    notes: "Appointment cancelled by patient.",
  },
];

function Appointments() {
  const navigate = useNavigate();
  const [appointments] = useState(sampleAppointments);

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
            <CalendarDays className="w-6 h-6" />
            Appointments
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
      <main className="flex-1 flex flex-col items-center justify-start md:pt-28 pt-20 pb-8 px-2 sm:px-4 md:px-8 w-full">
        <div className="w-full max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-blue-800">Appointments</h2>
            <p className="text-gray-600 mt-2">
              View and manage your upcoming and past medical appointments.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-10">
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
              <Bell className="mx-auto text-blue-600 mb-2" size={32} />
              <p className="font-semibold">Reminders & notifications</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
              <History className="mx-auto text-purple-600 mb-2" size={32} />
              <p className="font-semibold">Appointment history</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
              <RefreshCcw className="mx-auto text-green-600 mb-2" size={32} />
              <p className="font-semibold">Easy rescheduling</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
              <FileText className="mx-auto text-yellow-600 mb-2" size={32} />
              <p className="font-semibold">Doctor notes & feedback</p>
            </div>
          </div>

          {/* Appointments List */}
          <div className="bg-white/90 rounded-2xl shadow-xl border border-blue-100 p-4 sm:p-8">
            <h3 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              Your Appointments
            </h3>
            {appointments.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No appointments found.
              </div>
            ) : (
              <div className="space-y-6">
                {appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-blue-800">{appt.doctor}</span>
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                          {appt.specialty}
                        </span>
                      </div>
                      <div className="text-gray-600 text-sm flex items-center gap-2">
                        <CalendarDays size={16} />
                        {appt.date} at {appt.time}
                      </div>
                      <div className="text-xs mt-1">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full font-semibold ${
                            appt.status === "Upcoming"
                              ? "bg-green-100 text-green-700"
                              : appt.status === "Completed"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-500 text-sm mt-2 sm:mt-0">
                        <span className="font-semibold">Notes:</span> {appt.notes}
                      </div>
                    </div>
                    {appt.status === "Upcoming" && (
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-all text-sm mt-2 sm:mt-0">
                        Reschedule
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Appointments;