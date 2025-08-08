import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Aurora from "../components/Aurora";

const RegisterLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsRegister(!isRegister);
    setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      navigate("/dashboard");
      return;
    }

    // TODO: Add API call for login/register here

    // Redirect to dashboard after successful login/register
    navigate("/dashboard");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[url('https://static.vecteezy.com/system/resources/thumbnails/007/681/899/small/hospital-building-outside-composition-vector.jpg')] bg-cover bg-center bg-no-repeat">
  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

      {/* Aurora background as absolute, behind everything */}
      {/* <Aurora
        className="absolute inset-0 w-full h-full z-0"
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.5}
        glowIntensity={0.5}
        saturation={0.8}
        hueShift={240}
      /> */}
      {/* Form container above Aurora */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-100">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6 drop-shadow">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/70"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">
              Email
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

          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/70"
              placeholder="********"
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/70"
                placeholder="********"
              />
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
          Back
        </button>
      </div>
    </div>
  );
};

export default RegisterLogin;
