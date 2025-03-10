import React, { useEffect, useState } from "react";

const ProfilePopup = ({ onClose }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // Track if there's an error
  const loggedInErno = localStorage.getItem("loggedInUser"); // Get logged-in user's Enrollment Number

  useEffect(() => {
    if (!loggedInErno) {
      setLoading(false);
      return;
    }

    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(
          "https://login--data-default-rtdb.firebaseio.com/data.json"
        );
        if (!response.ok) throw new Error("Failed to fetch student details");

        const data = await response.json();
        let studentData = Object.values(data).find((s) => s.erno === loggedInErno);
        console.log(studentData.firstName)
        if (studentData) {
          setStudent(studentData);
        } else {
          console.log("No student found!");
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
        setError(true);
      }
      setLoading(false);
    };

    fetchStudentDetails();
  }, [loggedInErno]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 text-white text-lg font-semibold">
        Loading...
      </div>
    );
  }
  return (
    <div
      className="fixed top-16 right-4 bg-white p-6 rounded-lg shadow-lg w-80 border border-gray-200 transition-transform transform animate-fadeIn"
    >
      {error ? (
        <p className="text-red-600 text-center font-semibold">
          Error fetching profile data.
        </p>
      ) : student ? (
        <div className="flex flex-col items-center text-black">
          {/* Profile Image */}
          {student.profileImage && (
            <img
              src={student.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-4"
            />
          )}

          <h2 className="text-xl text-black font-bold mb-2">
            {student.firstName} {student.lastName}
          </h2>
          <p className="text-gray-600 text-sm">{student.email}</p>
          

          {/* Profile Details */}
          <div className="mt-4 space-y-2 w-full text-center">
            <p className="text-gray-600"><strong>Enrollment No:</strong> {student.erno}</p>
            {student.department && <p><strong>Department:</strong> {student.department}</p>}
            {student.year && <p><strong>Year:</strong> {student.year}</p>}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      ) : (
        <p className="text-gray-700 text-center">No profile data found.</p>
      )}
    </div>
  );
};

export default ProfilePopup;
