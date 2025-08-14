import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthProtect = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default AuthProtect;