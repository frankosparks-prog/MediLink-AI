import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  TimerReset,
  ShieldCheck,
  Truck,
  ArrowLeft,
  X,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";

const medicationData = [
  { id: 1, name: "Paracetamol", price: 5, description: "Pain reliever", category: "Painkillers" },
  { id: 2, name: "Amoxicillin", price: 12, description: "Antibiotic", category: "Antibiotics" },
  { id: 3, name: "Cetirizine", price: 7, description: "Anti-allergy", category: "Allergy" },
  { id: 4, name: "Ibuprofen", price: 8, description: "Anti-inflammatory", category: "Painkillers" },
  { id: 5, name: "Metformin", price: 15, description: "Diabetes medication", category: "Diabetes" },
  { id: 6, name: "Loratadine", price: 6, description: "Allergy relief", category: "Allergy" },
];

const categories = ["All", ...Array.from(new Set(medicationData.map(med => med.category)))];

const OrderMedication = () => {
  const [search, setSearch] = useState("");
  const [medications] = useState(medicationData);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const addToCart = (med) => {
    if (!cart.find((item) => item.id === med.id)) {
      setCart([...cart, { ...med, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert("Thank you for your order! Your medication will be delivered soon.");
    setCart([]);
    setShowCart(false);
  };

  // Filtered medications based on search and category
  const filteredMeds = medications.filter(
    (med) =>
      (filter === "All" || med.category === filter) &&
      med.name.toLowerCase().includes(search.toLowerCase())
  );

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
            <span role="img" aria-label="pill">
              💊
            </span>
            Order Medication
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

      {/* Floating Cart Icon */}
      <button
        className="fixed z-40 bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all animate-bounce"
        onClick={() => setShowCart(true)}
        aria-label="View Cart"
      >
        <ShoppingCart size={28} />
        {cart.length > 0 && (
          <span className="ml-2 bg-green-500 text-white rounded-full px-2 py-0.5 text-xs font-bold">
            {cart.length}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-blue-700 hover:text-red-500 text-xl font-bold"
              onClick={() => setShowCart(false)}
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-800">
              <ShoppingCart size={20} />
              Your Cart
            </h3>
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 py-8">Your cart is empty.</div>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <span className="font-semibold">{item.name}</span>
                      <span className="ml-2 text-gray-500 text-sm">${item.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-bold"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-bold"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="ml-3 text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-4 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  className="mt-4 w-full bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition font-semibold"
                  onClick={handleCheckout}
                >
                  Checkout Securely
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start md:pt-28 pt-20 pb-8 px-2 sm:px-4 md:px-8 w-full">
        <div className="w-full max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-blue-800">Order Medication</h2>
            <p className="text-gray-600 mt-2">
              Easily order and track your prescriptions and refills online.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center mb-10">
            <div className="bg-white p-6 rounded-xl shadow">
              <Truck className="mx-auto text-blue-600 mb-2" size={32} />
              <p className="font-semibold">Fast delivery</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <TimerReset className="mx-auto text-green-600 mb-2" size={32} />
              <p className="font-semibold">Prescription reminders</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <ShieldCheck className="mx-auto text-purple-600 mb-2" size={32} />
              <p className="font-semibold">Secure payments</p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 w-full">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search medications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-4 py-2 rounded-md w-full shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
              />
            </div>
            <select
              className="w-full sm:w-1/3 px-3 py-2 rounded-lg border border-blue-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Medication List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMeds.map((med) => (
              <div
                key={med.id}
                className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-xl transition flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3 text-blue-600 text-2xl font-bold">
                  {med.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold mb-1">{med.name}</h3>
                <p className="text-gray-500 mb-2">{med.description}</p>
                <span className="mb-2 inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                  {med.category}
                </span>
                <p className="mb-4 font-bold text-blue-700">${med.price}</p>
                <button
                  onClick={() => addToCart(med)}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold w-full"
                >
                  Add to Cart
                </button>
              </div>
            ))}
            {filteredMeds.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-8">
                No medications found.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderMedication;