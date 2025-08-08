import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { UserCircle, LogOut, Stethoscope, Syringe, CalendarDays } from "lucide-react";
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
      <header className="fixed z-30 w-full bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm py-3 px-2 sm:py-4 sm:px-8 flex items-center justify-between">
        {/* Left: Home/Welcome */}
        <button onClick={() => navigate("/")} className="flex-shrink-0">
          <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl font-extrabold text-blue-800 flex items-center gap-1 sm:gap-2 rounded bg-white/70 hover:bg-blue-50 transition-all px-2 py-1 shadow">
            <span role="img" aria-label="wave">👋</span>
            <span className="hidden xs:inline">Welcome,</span>
            <span>{user?.name || "Janex"}</span>
          </h1>
        </button>
        {/* Center: MediLink AI Brand */}
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
        {/* Right: Profile & Logout */}
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
            <LogOut size={16} /> <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center pt-28 pb-8 px-2 sm:px-4 md:px-8 w-full">
        <div className="w-full">
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-blue-800 mb-2">
            Your Health Dashboard
          </h2>
          <p className="mb-4 sm:mb-6 text-gray-700 text-base sm:text-lg">
            Manage your health, appointments, and consultations all in one place.
          </p>

          {/* Responsive Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Symptom Checker */}
            <div className="flex flex-col h-full p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow transition-transform hover:scale-[1.025]">
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope className="text-blue-600 w-6 h-6" />
                <span className="text-xl font-semibold text-blue-800">Symptom Checker</span>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                Describe your symptoms and get instant AI-powered health insights.
              </p>
              <ul className="text-xs text-blue-700 mb-3 list-disc list-inside">
                <li>Smart suggestions</li>
                <li>Personalized advice</li>
                <li>24/7 availability</li>
                <li>Consult with AI or a doctor</li>
              </ul>
              <button
                className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-all text-sm"
                onClick={() => navigate("/chatbox")}
              >
                Start Symptom Checker
              </button>
            </div>
            {/* Book a Doctor */}
            <div className="flex flex-col h-full p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 shadow transition-transform hover:scale-[1.025]">
              <div className="flex items-center gap-2 mb-2">
                <UserCircle className="text-purple-600 w-6 h-6" />
                <span className="text-xl font-semibold text-purple-800">Book a Doctor</span>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                Find and book appointments with top-rated doctors near you.
              </p>
              <ul className="text-xs text-purple-700 mb-3 list-disc list-inside">
                <li>Specialist matching</li>
                <li>Easy scheduling</li>
                <li>Video consultations</li>
                <li>Doctor profiles & reviews</li>
              </ul>
              <button
                className="mt-auto bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-purple-700 transition-all text-sm"
                onClick={() => navigate("/bookdoctor")}
              >
                Book Now
              </button>
            </div>
            {/* Order Medication */}
            <div className="flex flex-col h-full p-5 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow transition-transform hover:scale-[1.025]">
              <div className="flex items-center gap-2 mb-2">
                <Syringe className="text-green-600 w-6 h-6" />
                <span className="text-xl font-semibold text-green-800">Order Medication</span>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                Easily order and track your prescriptions and refills online.
              </p>
              <ul className="text-xs text-green-700 mb-3 list-disc list-inside">
                <li>Fast delivery</li>
                <li>Prescription reminders</li>
                <li>Secure payments</li>
                <li>Order history & tracking</li>
              </ul>
              <button
                className="mt-auto bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition-all text-sm"
                onClick={() => navigate("/ordermedication")}
              >
                Order Now
              </button>
            </div>
            {/* Appointments */}
            <div className="flex flex-col h-full p-5 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 shadow transition-transform hover:scale-[1.025]">
              <div className="flex items-center gap-2 mb-2">
                <CalendarDays className="text-yellow-600 w-6 h-6" />
                <span className="text-xl font-semibold text-yellow-800">Appointments</span>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                View and manage your upcoming and past medical appointments.
              </p>
              <ul className="text-xs text-yellow-700 mb-3 list-disc list-inside">
                <li>Reminders & notifications</li>
                <li>Appointment history</li>
                <li>Easy rescheduling</li>
                <li>Doctor notes & feedback</li>
              </ul>
              <button
                className="mt-auto bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-600 transition-all text-sm"
                onClick={() => navigate("/appointments")}
              >
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



// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import { useEffect } from "react";
// import { UserCircle, LogOut, Stethoscope, Syringe, CalendarDays, FileText } from "lucide-react";
// import Footer from "../components/Footer";

// const PatientDashboard = () => {
//   const navigate = useNavigate();
//   const auth = useAuth();
//   const user = auth?.user;
//   const logout = auth?.logout || (() => {});

//   // Uncomment this for auth protection
//   // useEffect(() => {
//   //   if (!user) {
//   //     navigate("/auth");
//   //   }
//   // }, [user, navigate]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col">
//       {/* Header */}
//       <header className="fixed z-30 w-full bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm py-3 px-2 sm:py-4 sm:px-8 flex items-center justify-between">
//         {/* Left: Home/Welcome */}
//         <button onClick={() => navigate("/")} className="flex-shrink-0">
//           <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl font-extrabold text-blue-800 flex items-center gap-1 sm:gap-2 rounded bg-white/70 hover:bg-blue-50 transition-all px-2 py-1 shadow">
//             <span role="img" aria-label="wave">👋</span>
//             <span className="hidden xs:inline">Welcome,</span>
//             <span>{user?.name || "Patient"}</span>
//           </h1>
//         </button>
//         {/* Center: MediLink AI Brand */}
//         <Link
//           to="/"
//           className="absolute left-1/2 -translate-x-1/2 text-lg xs:text-xl sm:text-2xl font-extrabold tracking-tight text-blue-700 flex items-center gap-1 sm:gap-2"
//           style={{ pointerEvents: "auto" }}
//         >
//           <svg
//             className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={2}
//             viewBox="0 0 24 24"
//           >
//             <path
//               d="M12 4v16m8-8H4"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//           MediLink <span className="text-blue-400">AI</span>
//         </Link>
//         {/* Right: Profile & Logout */}
//         <div className="flex items-center gap-2 sm:gap-4">
//           <button
//             onClick={() => navigate("/profile")}
//             className="flex items-center gap-1 sm:gap-2 bg-white/70 border border-blue-200 text-blue-700 px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold shadow hover:bg-blue-50 transition-all text-sm sm:text-base"
//             title="Profile"
//           >
//             <UserCircle className="w-5 h-5 sm:w-6 sm:h-6" />
//             <span className="hidden md:inline">Profile</span>
//           </button>
//           <button
//             onClick={() => {
//               logout();
//               navigate("/auth");
//             }}
//             className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 sm:px-5 sm:py-2 rounded-lg font-semibold shadow hover:from-red-600 hover:to-pink-600 transition-all flex items-center gap-1 text-sm sm:text-base"
//           >
//             <LogOut size={16} /> <span className="hidden md:inline">Logout</span>
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col items-center justify-center pt-20 md:pt-0 pb-8 px-2 sm:px-4 md:px-8 w-full">
//         <div className="w-full">
//           <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-blue-800 mb-2">
//             Your Health Dashboard
//           </h2>
//           <p className="mb-4 sm:mb-6 text-gray-700 text-base sm:text-lg">
//             Manage your health, appointments, and consultations all in one place.
//           </p>

//           {/* Responsive Cards Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {/* Symptom Checker */}
//             <div className="flex flex-col h-full p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow">
//               <div className="flex items-center gap-2 mb-2">
//                 <Stethoscope className="text-blue-600 w-6 h-6" />
//                 <span className="text-xl font-semibold text-blue-800">Symptom Checker</span>
//               </div>
//               <p className="text-gray-700 text-sm mb-2">
//                 Describe your symptoms and get instant AI-powered health insights.
//               </p>
//               <ul className="text-xs text-blue-700 mb-3 list-disc list-inside">
//                 <li>Smart suggestions</li>
//                 <li>Personalized advice</li>
//                 <li>24/7 availability</li>
//               </ul>
//               <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-all text-sm">
//                 Start Symptom Checker
//               </button>
//             </div>
//             {/* Book a Doctor */}
//             <div className="flex flex-col h-full p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 shadow">
//               <div className="flex items-center gap-2 mb-2">
//                 <UserCircle className="text-purple-600 w-6 h-6" />
//                 <span className="text-xl font-semibold text-purple-800">Book a Doctor</span>
//               </div>
//               <p className="text-gray-700 text-sm mb-2">
//                 Find and book appointments with top-rated doctors near you.
//               </p>
//               <ul className="text-xs text-purple-700 mb-3 list-disc list-inside">
//                 <li>Specialist matching</li>
//                 <li>Easy scheduling</li>
//                 <li>Video consultations</li>
//               </ul>
//               <button className="mt-auto bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-purple-700 transition-all text-sm">
//                 Book Now
//               </button>
//             </div>
//             {/* Order Medication */}
//             <div className="flex flex-col h-full p-5 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow">
//               <div className="flex items-center gap-2 mb-2">
//                 <Syringe className="text-green-600 w-6 h-6" />
//                 <span className="text-xl font-semibold text-green-800">Order Medication</span>
//               </div>
//               <p className="text-gray-700 text-sm mb-2">
//                 Easily order and track your prescriptions and refills online.
//               </p>
//               <ul className="text-xs text-green-700 mb-3 list-disc list-inside">
//                 <li>Fast delivery</li>
//                 <li>Prescription reminders</li>
//                 <li>Secure payments</li>
//               </ul>
//               <button className="mt-auto bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition-all text-sm">
//                 Order Now
//               </button>
//             </div>
//             {/* Appointments */}
//             <div className="flex flex-col h-full p-5 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 shadow">
//               <div className="flex items-center gap-2 mb-2">
//                 <CalendarDays className="text-yellow-600 w-6 h-6" />
//                 <span className="text-xl font-semibold text-yellow-800">Appointments</span>
//               </div>
//               <p className="text-gray-700 text-sm mb-2">
//                 View and manage your upcoming and past medical appointments.
//               </p>
//               <ul className="text-xs text-yellow-700 mb-3 list-disc list-inside">
//                 <li>Reminders & notifications</li>
//                 <li>Appointment history</li>
//                 <li>Easy rescheduling</li>
//               </ul>
//               <button className="mt-auto bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-600 transition-all text-sm">
//                 View Appointments
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default PatientDashboard;