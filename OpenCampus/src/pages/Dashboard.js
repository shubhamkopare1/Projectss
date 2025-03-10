import React, { useState } from "react";
import ProfilePopup from "../components/ProfilePopup"; // Import the Profile Popup

const Dashboard2 = () => {
  const [showPopup, setShowPopup] = useState(false);
  const studentId = "202312345"; // Replace this with dynamic student ID from login

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <button 
        onClick={() => setShowPopup(true)} 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        View Profile
      </button>

      {showPopup && <ProfilePopup studentId={studentId} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Dashboard2;
