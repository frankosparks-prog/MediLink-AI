import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/scrollTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RegisterLogin from "./pages/RegisterLogin";
import PatientDashboard from "./pages/PatientDashboard";
import PatientProfile from "./pages/PatientProfile";
import Chat from "./pages/Chat";
import Appointments from "./pages/Appointments";
import OrderMedication from "./pages/OrderMedication";
import BookDoctor from "./pages/BookDoctor";
import AdminDashboard from "./Admin/AdminDashboard";
import ProtectedRoute from "./Admin/ProtectedRoute";
import NotFound from "./components/NotFound";
import AuthProtect from "./components/AuthProtect";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const hideNavAndFooter = pathname.startsWith("/medilink/admin") || pathname === "/auth";
  return (
    <>
      <ScrollToTop />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: { style: { background: "#D1FAE5", color: "#065F46" } },
          error: { style: { background: "#FEE2E2", color: "#991B1B" } },
        }}
      />
      {!hideNavAndFooter && <Navbar />}
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
      {!hideNavAndFooter && <Footer />}
    </>
  );
};

const protectedRoutes = [
  { path: "/dashboard", element: <PatientDashboard /> },
  { path: "/profile", element: <PatientProfile /> },
  { path: "/bookdoctor", element: <BookDoctor /> },
  { path: "/appointments", element: <Appointments /> },
  { path: "/chatbox", element: <Chat /> },
  { path: "/ordermedication", element: <OrderMedication /> },
];

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/auth" element={<Layout><RegisterLogin /></Layout>} />
      {protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <AuthProtect>
              <Layout>{element}</Layout>
            </AuthProtect>
          }
        />
      ))}
      <Route
        path="/medilink/admin/*"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}