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
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📜Anonymous Complaints</h2>
      <ul className="space-y-4">
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <li key={complaint.id} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
              <div>
                <strong className="text-lg">{complaint.title}</strong>
                <p className="text-gray-600">{complaint.text}</p>
                <p className="text-gray-800 mt-1">
                  <strong>Posted by:</strong> {complaint.studentName}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No complaints available.</p>
        )}
      </ul>
    </div>
  );
}

export default ComplaintList;
