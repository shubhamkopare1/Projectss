import React, { useEffect, useState } from "react";

function ComplaintList() {
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

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-900 shadow-lg rounded-lg p-6 mt-6">
      <h3 className="text-xl font-semibold text-white mb-4">📢 Complaints</h3>
      {complaints.length > 0 ? (
        <ul className="space-y-4">
          {complaints.map((complaint) => (
            <li key={complaint.id} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
              <strong className="text-gray-900">{complaint.title}</strong>:{" "}
              <span className="text-gray-700">{complaint.text}</span>
              <p className="text-gray-800 mt-1">
                <strong>Posted by:</strong>{" "}
                {complaint.revealed ? complaint.studentName : "Anonymous"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No complaints submitted.</p>
      )}
    </div>
  );
}

export default ComplaintList;
