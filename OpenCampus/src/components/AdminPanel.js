import React, { useEffect, useState } from "react";

function AdminPanel() {
  const [complaints, setComplaints] = useState([]);
  const databaseURL = "https://complaints-b298e-default-rtdb.firebaseio.com/complaints.json";

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(databaseURL);
      const data = await response.json();

      if (data) {
        const complaintsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setComplaints(complaintsArray);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await fetch(`https://complaints-b298e-default-rtdb.firebaseio.com/complaints/${id}.json`, {
        method: "DELETE",
      });
      setComplaints(complaints.filter((complaint) => complaint.id !== id));
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  const revealStudent = async (id, studentId) => {
    try {
      const response = await fetch("https://login--data-default-rtdb.firebaseio.com/data.json");
      const students = await response.json();

      let studentData = null;
      for (const key in students) {
        if (students[key].erno === studentId) {
          studentData = students[key];
          break;
        }
      }

      if (studentData) {
        await fetch(`https://complaints-b298e-default-rtdb.firebaseio.com/complaints/${id}.json`, {
          method: "PATCH",
          body: JSON.stringify({ studentName: `${studentData.firstName} ${studentData.lastName}` }),
          headers: { "Content-Type": "application/json" },
        });

        fetchComplaints(); // Refresh the complaint list
      }
    } catch (error) {
      console.error("Error revealing student details:", error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📢 Anonymous Complaint's Admin Panel</h2>
      <ul className="space-y-4">
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <li key={complaint.id} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
              <div>
                <strong className="text-lg">{complaint.title}</strong>
                <p className="text-gray-600">{complaint.text}</p>
                <p className="text-gray-800 mt-1"><strong>Posted by:</strong> {complaint.studentName}</p>

                {complaint.studentName === "Anonymous" && (
                  <button
                    onClick={() => revealStudent(complaint.id, complaint.studentId)}
                    className="mt-3 bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                  >
                    🔍 Reveal Student
                  </button>
                )}
              </div>

              <button 
                onClick={() => deleteComplaint(complaint.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                🗑 Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No complaints available.</p>
        )}
      </ul>
    </div>
  );
}

export default AdminPanel;
