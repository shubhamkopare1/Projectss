// import "./App.css";
// import { Route, Routes, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Profile from "./pages/Profile";
// import Home2 from "./components/Home2";  // Admin Dashboard
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import LeaveRequest from "./pages/LeaveRequest";
// import FacultyDashboard from "./admin/FacultyDashboard";
// import AdminLogin from "./admin/AdminLogin";
// import ComplaintForm from "./components/ComplaintForm.js";
// import AdminPanel from "./components/AdminPanel.js";
// import ApplicationForm from "./components/ApplicationForm.js";
// import BudgetApprovalSystem from "./admin/BudgetApprovalSystem.js";
// import Layout from "./pages/Layout.js"; 
// import { getDatabase, ref, onValue, set, push, off } from "firebase/database";
// import { app } from "./firebase.js";
// import Dashboard from "./components/Dashboard.js";
// import FacilityBooking from "./components/FacilityBooking.jsx";
// import ElectionRegistration from "./elections/ElectionRegistration.jsx";
// import { FacebookAuthProvider } from "firebase/auth";
// import AdminElectionDashboard from "./elections/AdminElectionDashboard.jsx";

// const db = getDatabase(app);

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
//   });

//   const [isAdmin, setIsAdmin] = useState(() => {
//     return localStorage.getItem("isAdmin") === "true";
//   });

//   useEffect(() => {
//     localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
//     if (!isLoggedIn) localStorage.removeItem("isAdmin"); // Reset admin state on logout
//   }, [isLoggedIn]);

//   return (
//     <div className="App">
//       <Routes>
//         {!isLoggedIn ? (
//           <>
//             <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//             <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
//             <Route path="/admin-login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
//             <Route path="*" element={<Navigate to="/login" />} />
//           </>
//         ) : isAdmin ? (
//           <>
//             <Route path="/admin" element={<Home2 setIsLoggedIn={setIsLoggedIn} />} />
//             <Route path="/admin/budget" element={<BudgetApprovalSystem />} />
//             <Route path="/admin/complaint-panel" element={<AdminPanel />} />
//             <Route path="/admin/facultydashbord" element={<FacultyDashboard />} />
//             <Route path="/admin/electiondashbord" element={<AdminElectionDashboard />} />
//             <Route path="*" element={<Navigate to="/admin" />} />
//           </>
//         ) : (
//           <>
//             <Route path="/" element={<Layout setIsLoggedIn={setIsLoggedIn} />}>
//               <Route index element={<Dashboard />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/applications" element={<ApplicationForm />} />
//               <Route path="/leave" element={<LeaveRequest />} />
//               <Route path="/facility" element={<FacilityBooking />} />
//               <Route path="/elections" element={<ElectionRegistration />} />
//               <Route path="/complaints" element={<ComplaintForm />} />
//             </Route>
//             <Route path="*" element={<Navigate to="/" />} />
//           </>
//         )}
//       </Routes>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Profile from "./pages/Profile";
import Home2 from "./components/Home2"; // Admin Dashboard
import Login from "./components/Login";
import Signup from "./components/Signup";
import LeaveRequest from "./pages/LeaveRequest";
import FacultyDashboard from "./admin/FacultyDashboard";
import AdminLogin from "./admin/AdminLogin";
import ComplaintForm from "./components/ComplaintForm";
import AdminPanel from "./components/AdminPanel";
import ApplicationForm from "./components/ApplicationForm";
import BudgetApprovalSystem from "./admin/BudgetApprovalSystem";
import Layout from "./pages/Layout";
import Dashboard from "./components/Dashboard";
import FacilityBooking from "./components/FacilityBooking";
import ElectionRegistration from "./elections/ElectionRegistration";
import AdminElectionDashboard from "./elections/AdminElectionDashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return JSON.parse(localStorage.getItem("isAdmin")) || false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    
    if (!isLoggedIn) {
      localStorage.removeItem("isAdmin");
      setIsAdmin(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
  }, [isAdmin]); // This ensures localStorage is updated when admin status changes.

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin-login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <div className="App">
      <Routes>
        {isAdmin ? (
          <>
            <Route path="/admin" element={<Home2 setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/admin/budget" element={<BudgetApprovalSystem />} />
            <Route path="/admin/complaint-panel" element={<AdminPanel />} />
            <Route path="/admin/facultydashboard" element={<FacultyDashboard />} />
            <Route path="/admin/electiondashboard" element={<AdminElectionDashboard />} />
            <Route path="*" element={<Navigate to="/admin" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Layout setIsLoggedIn={setIsLoggedIn} />}>
              <Route index element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/applications" element={<ApplicationForm />} />
              <Route path="/leave" element={<LeaveRequest />} />
              <Route path="/facility" element={<FacilityBooking />} />
              <Route path="/elections" element={<ElectionRegistration />} />
              <Route path="/complaints" element={<ComplaintForm />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
