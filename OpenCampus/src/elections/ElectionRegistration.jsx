import React, { useState, useEffect } from "react";
import StudentVoting from "./StudentVoting";
import StudentElectionResults from "./StudentElectionResults";

const ElectionRegistration = ({ studentId }) => {
  const [candidate, setCandidate] = useState({
    name: "",
    enrollmentNo: "",
    position: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);

  const positions = [
    "President",
    "Vice President",
    "Secretary",
    "Treasurer",
    "Public Relations Officer",
    "Cultural Secretary",
    "Sports Secretary",
    "Academic Secretary",
  ];

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        // Fetch student details
        const studentsResponse = await fetch(
          "https://login--data-default-rtdb.firebaseio.com/data.json"
        );
        const studentsData = await studentsResponse.json();

        const students = studentsData ? Object.values(studentsData) : [];
        const student = students.find((s) => s.id === studentId);

        if (student) {
          setCandidate((prev) => ({
            ...prev,
            name: student.firstName || "N/A",
            enrollmentNo: student.erno || "N/A",
          }));
        }

        // Fetch registered candidates
        const candidatesResponse = await fetch(
          "https://voting-69b4e-default-rtdb.firebaseio.com/candidates.json"
        );
        const candidatesData = await candidatesResponse.json();
        const candidates = candidatesData ? Object.values(candidatesData) : [];

        // Check if the student is already registered
        const registered = candidates.some(
          (c) => c.enrollmentNo === student?.enrollmentNo
        );
        setIsRegistered(registered);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  const handleRegister = async () => {
    if (!candidate.position) {
      alert("Please select a position.");
      return;
    }

    if (isRegistered) {
      alert("You have already registered for an election position.");
      return;
    }

    try {
      await fetch(
        "https://voting-69b4e-default-rtdb.firebaseio.com/candidates.json",
        {
          method: "POST",
          body: JSON.stringify(candidate),
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Registered successfully!");
      setIsRegistered(true);
    } catch (error) {
      console.error("Error registering candidate:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Register for Election
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Name:
          </label>
          <input
            type="text"
            value={candidate.name || "Fetching name..."}
            className="w-full p-2 border rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Enrollment No:
          </label>
          <input
            type="text"
            value={candidate.enrollmentNo || "Fetching enrollment no..."}
            className="w-full p-2 border rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Select Position:
          </label>
          <select
            className="w-full p-2 border rounded-md bg-white text-gray-700"
            onChange={(e) =>
              setCandidate({ ...candidate, position: e.target.value })
            }
            disabled={isRegistered}
          >
            <option value="">Choose Position</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        <button
          className={`w-full py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
            isRegistered
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleRegister}
          disabled={isRegistered}
        >
          {isRegistered ? "Already Registered" : "Register"}
        </button>
      </div>

      <div className="w-full max-w-2xl mt-8">
        <StudentVoting />
      </div>

      <div className="w-full max-w-2xl mt-6">
        <StudentElectionResults />
      </div>
    </div>
  );
};

export default ElectionRegistration;
