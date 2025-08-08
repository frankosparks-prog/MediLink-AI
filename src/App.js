
// // import React from 'react';
// // import { Routes, Route } from 'react-router-dom';
// // // Correctly import components with capitalized names
// // import Contacts from './components/contacts';

// // import Form from './components/form';
// // import Navbar from './components/navbar';
// // import History from './components/history';
// // import Fire from './components/fire';
// // import About from './components/about';
// // import Login from './components/login';
// // import Home from './components/home';
// // import Footer from './components/footer';
// // import ScrollToTop from './components/scrollTop';
// // import Occurrence from './components/Occurrence';
// // import { Toaster } from 'react-hot-toast';

// // const App = () => {
// //   return (
// //     <div>
// //       <ScrollToTop />
// //       <Toaster
// //         position="top-right"
// //         reverseOrder={false}
// //         toastOptions={{
// //           success: {
// //             style: {
// //               background: '#D1FAE5', // light green
// //               color: '#065F46',      // dark green text
// //             },
// //           },
// //           error: {
// //             style: {
// //               background: '#FEE2E2', // light red
// //               color: '#991B1B',      // dark red text
// //             },
// //           },
// //   }}
// // />
// //       <Navbar />
// //       <Routes>
// //         {/* <Route exact path="/" element={<Login />} /> */}
// //         <Route exact path="/" element={<Home />} />
// //         <Route path="/contact" element={<Contacts />} />
// //         <Route path="/form" element={<Form />} />
// //         <Route path="/history" element={<History />} />
// //         <Route path="/fire" element={<Fire />} />
// //         <Route path="/about" element={<About />} />
// //          <Route path="/occurrence" element={<Occurrence />} />
        
// //       </Routes>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default App;
// import React from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import Contacts from './components/contacts';
// import Form from './components/form';
// import Navbar from './components/navbar';
// import History from './components/history';
// import Fire from './components/fire';
// import About from './components/about';
// import Login from './components/login';
// import Home from './components/home';
// import Footer from './components/footer';
// import ScrollToTop from './components/scrollTop';
// import Occurrence from './components/Occurrence';
// import { Toaster } from 'react-hot-toast';
// import Signup from './components/SignUp';
// import NotFound from './components/NotFound';
// // Admin components
// import UsersDetails from "./components/Admin/UserDetails";
// import AdminDashboard from "./components/Admin/AdminDashboard";
// import ProtectedRoute from "./components/Admin/ProtectedRoute";
// import VisitordsDetails from './components/Admin/VisitordsDetails';
// import AdminOccurrence from './components/Admin/AdminOccurrence';

// const App = () => {
//   const location = useLocation();
//   const token = localStorage.getItem('token');
//   const user = JSON.parse(localStorage.getItem('user'));
//   const isLoggedIn = !!token;
//   const isAdmin = user?.isAdmin;

//   // Paths where Navbar/Footer should be hidden
//   const hideNavAndFooterPaths = ['/', '/ultra/admin'];

//   const shouldHideNavAndFooter = hideNavAndFooterPaths.includes(location.pathname);

//   return (
//     <div>
//       <ScrollToTop />
//       <Toaster
//         position="top-right"
//         reverseOrder={false}
//         toastOptions={{
//           success: {
//             style: {
//               background: '#D1FAE5',
//               color: '#065F46',
//             },
//           },
//           error: {
//             style: {
//               background: '#FEE2E2',
//               color: '#991B1B',
//             },
//           },
//         }}
//       />

//       {/* Conditionally show Navbar */}
//       {!shouldHideNavAndFooter && isLoggedIn && !isAdmin && <Navbar setIsLoggedIn={() => {}} />}

//       <Routes>
//         <Route path="/" element={<Login onLogin={() => {}} />} />

//         {isLoggedIn && !isAdmin && (
//           <>
//             <Route path="/home" element={<Home />} />
//             <Route path="/contact" element={<Contacts />} />
//             <Route path="/form" element={<Form />} />
//             <Route path="/history" element={<History />} />
//             <Route path="/fire" element={<Fire />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/occurrence" element={<Occurrence />} />
//           </>
//         )}

//         {/* Admin Routes */}
//         <Route path="/ultra/admin" element={<Login />} />
//         <Route
//           path="/ultra/admin/dashboard/*"
//           element={
//             <ProtectedRoute>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Navigate to="users" replace />} />
//           <Route path="users" element={<UsersDetails />} />
//           <Route path="usersignup" element={<Signup />} />
//           <Route path="visitorsdetails" element={<VisitordsDetails />} />
//            <Route path="occurrence" element={<AdminOccurrence />} />
//         </Route>

//         <Route path="*" element={<NotFound />} />
//       </Routes>

//       {/* Conditionally show Footer */}
//       {!shouldHideNavAndFooter && isLoggedIn && !isAdmin && <Footer />}
//     </div>
//   );
// };

// export default App;

// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterLogin from "./pages/RegisterLogin";
import PatientDashboard from "./pages/PatientDashboard";
import PatientProfile from "./pages/PatientProfile";
import ScrollToTop from "./components/scrollTop";
import Chat from "./pages/Chat";
import Appointments from "./pages/Appointments";
import OrderMedication from "./pages/OrderMedication";
import BookDoctor from "./pages/BookDoctor";



function App() {
  return (
    <>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<RegisterLogin />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/profile" element={<PatientProfile />} />
        <Route path="/bookdoctor" element={<BookDoctor />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/chatbox" element={<Chat />} />
        <Route path="/ordermedication" element={<OrderMedication />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
