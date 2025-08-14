import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
// import Aurora from "../components/Aurora";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const RegisterLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleToggle = () => {
    setIsRegister(!isRegister);
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      if (isRegister) {
        // Registration
        const res = await fetch(`${SERVER_URL}/api/loginSignup/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Registration failed");
        toast.success("Registration successful! Please login.");
        setIsRegister(false);
        setFormData({ username: "", email: "", password: "", confirmPassword: "" });
      } else {
        // Login
        const res = await fetch(`${SERVER_URL}/api/loginSignup/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");
        // Save token and user to localStorage and context
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        login(data.user); // update context for Navbar and protected routes
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[url('https://static.vecteezy.com/system/resources/thumbnails/007/681/899/small/hospital-building-outside-composition-vector.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

      {/* Form container */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-100">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6 drop-shadow">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-1 flex items-center gap-1">
                <User size={16} /> Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/70"
                placeholder="John Doe"
              />
            </div>
          )}

          {!isRegister && (
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-1 flex items-center gap-1">
                <User size={16} /> Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/70"
                placeholder="Enter your username"
              />
            </div>
          )}

          {isRegister && (
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-1 flex items-center gap-1">
                <Mail size={16} /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/70"
                placeholder="you@example.com"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1 flex items-center gap-1">
              <Lock size={16} /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/70 pr-10"
                placeholder="********"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-1 flex items-center gap-1">
                <Lock size={16} /> Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/70 pr-10"
                  placeholder="********"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500"
                  tabIndex={-1}
                  onClick={() => setShowConfirm((v) => !v)}
                >
                  <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 to-blue-400 text-white py-2.5 rounded-lg font-bold shadow-lg hover:from-blue-800 hover:to-blue-500 transition-all text-lg"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-blue-700 mt-6">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={handleToggle}
            className="text-blue-600 hover:underline font-semibold transition"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
        <button
          onClick={handleBack}
          className="mt-4 w-full py-2 rounded-lg border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition"
        >
          Back Home
        </button>
      </div>
    </div>
  );
};

export default RegisterLogin;