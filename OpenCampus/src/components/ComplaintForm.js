import React, { useState, useEffect } from "react";
import ComplaintList from "../components/ComplaintList";

function ComplaintForm({complaints}) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    const loggedInErno = localStorage.getItem("loggedInUser");
    if (loggedInErno) {
      setStudentId(loggedInErno);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && text.trim()) {
      const newComplaint = {
        title,
        text,
        studentId, // Store student ID but keep the name hidden initially
        studentName: "Anonymous", // Default until admin reveals identity
      };

      try {
        await fetch(
          "https://complaints-b298e-default-rtdb.firebaseio.com/complaints.json",
          {
            method: "POST",
            body: JSON.stringify(newComplaint),
            headers: { "Content-Type": "application/json" },
          }
        );

        setTitle("");
        setText("");
        alert("Complaint submitted!");
      } catch (error) {
        console.error("Error submitting complaint:", error);
      }
    } else {
      alert("Please enter a title and complaint.");
    }
  };

  return (
    <div className="p-16 bg-black">
      <div className="h-[100vh]  ">
      <div className="w-full max-w-lg mx-auto bg-gray-900 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          📢 Submit a Complaint
        </h2>
        <input
          type="text"
          placeholder="Enter complaint title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-3"
        />
        <textarea
          placeholder="Write your complaint..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-3 h-24"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Complaint
        </button>
      </div>

      <ComplaintList complaints={complaints} />
    </div>
    </div>
  );
}

export default ComplaintForm;
