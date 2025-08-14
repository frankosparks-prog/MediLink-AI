import React, { useState } from "react";
import { Calendar, Clock, User, Stethoscope, LocateIcon, ArrowLeft, Search } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

// Add random profile images for doctors
const doctorImages = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/men/41.jpg",
];

const doctors = [
  {
    id: 1,
    name: "Dr. Aisha Kamau",
    specialty: "Cardiologist",
    location: "Nairobi Hospital",
    availability: "Mon - Fri, 9AM - 3PM",
    image: doctorImages[0],
  },
  {
    id: 2,
    name: "Dr. Peter Mwangi",
    specialty: "Dermatologist",
    location: "Aga Khan University Hospital",
    availability: "Tue & Thu, 11AM - 4PM",
    image: doctorImages[1],
  },
  {
    id: 3,
    name: "Dr. Joy Wanjiku",
    specialty: "Pediatrician",
    location: "Mater Hospital",
    availability: "Mon, Wed, Fri, 10AM - 2PM",
    image: doctorImages[2],
  },
  {
    id: 4,
    name: "Dr. John Otieno",
    specialty: "General Physician",
    location: "Kenyatta Hospital",
    availability: "Mon - Sat, 8AM - 5PM",
    image: doctorImages[3],
  },
];

const specialties = [
  "All",
  ...Array.from(new Set(doctors.map((doc) => doc.specialty))),
];

const BookDoctor = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({ date: "", time: "" });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || doc.specialty === filter;
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDoctor) return alert("Please select a doctor first.");
    alert(
      `Appointment booked with ${selectedDoctor.name} on ${formData.date} at ${formData.time}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Header */}
      {/* <header className="fixed z-30 w-full bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm py-4 px-2 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-blue-100 transition"
            title="Back"
          >
            <ArrowLeft className="w-6 h-6 text-blue-700" />
          </button>
          <h1 className="text-xl sm:text-2xl font-extrabold text-blue-800 flex items-center gap-2">
            <span role="img" aria-label="doctor">🩺</span>
            Book a Doctor
          </h1>
        </div>
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
      </header> */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start md:pt-28 pt-20 pb-8 px-2 sm:px-4 md:px-8 w-full">
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-800">Book a Doctor</h2>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <div className="relative w-full sm:w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
              <input
                type="text"
                placeholder="Search by name or location..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-300 outline-none shadow-sm bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="w-full sm:w-1/4 px-3 py-2 rounded-lg border border-blue-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Doctor list */}
            <div className="space-y-4">
              {filteredDoctors.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No doctors found.
                </div>
              )}
              {filteredDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className={`border rounded-xl p-4 shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 flex items-center gap-4 ${
                    selectedDoctor?.id === doc.id ? "border-green-500 bg-green-50" : ""
                  }`}
                  onClick={() => setSelectedDoctor(doc)}
                >
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="h-16 w-16 rounded-full object-cover border-2 border-blue-200 shadow"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-blue-900">{doc.name}</h3>
                    <p className="text-gray-600 flex items-center gap-1 mt-1">
                      <Stethoscope size={16} /> {doc.specialty}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <LocateIcon size={16} /> {doc.location}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Clock size={16} /> {doc.availability}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-xl shadow-lg space-y-4 border border-gray-100"
            >
              <h3 className="text-xl font-bold mb-2 text-blue-800">Appointment Details</h3>

              <div>
                <label className="block mb-1 font-medium">Date</label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <Calendar className="text-gray-500 mr-2" />
                  <input
                    type="date"
                    className="w-full outline-none"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Time</label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <Clock className="text-gray-500 mr-2" />
                  <input
                    type="time"
                    className="w-full outline-none"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDoctor;