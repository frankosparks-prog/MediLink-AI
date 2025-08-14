import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user")) || null
  
  );

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("AuthProvider user:", user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Clear token if stored
  };

  useEffect(() => {
    // Optional: auto-logout logic, token expiry, etc.
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access context
export const useAuth = () => useContext(AuthContext);
