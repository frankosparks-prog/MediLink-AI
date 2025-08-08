import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed z-30 top-0 w-full backdrop-blur-md bg-white/70 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-blue-700 flex items-center gap-2"
        >
          <svg
            className="w-8 h-8 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M12 4v16m8-8H4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          MediLink <span className="text-blue-400">AI</span>
        </Link>
        <div className="space-x-2 sm:space-x-4 flex items-center">
          {/* <Link
            to="/dashboard"
            className="hidden sm:inline-block px-4 py-2 rounded-lg font-medium text-blue-700 hover:bg-blue-100 transition"
          >
            Dashboard
          </Link> */}
          <Link
            to="/auth"
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-5 py-2 rounded-lg shadow-md font-semibold hover:from-blue-700 hover:to-blue-500 transition-all duration-200"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;