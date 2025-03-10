import React, { useState, useEffect } from "react";
import { db, ref, onValue, update } from "../firebase.js"; // Ensure Firebase is correctly initialized
import { toast } from "react-toastify";

const FacultyDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = () => {
      const leaveRef = ref(db, "leaveRequests"); // Change to your database path
      onValue(leaveRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const requests = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setLeaveRequests(requests);
        } else {
          setLeaveRequests([]);
        }
      });
    };

    fetchLeaveRequests();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await update(ref(db, `leaveRequests/${id}`), { status: newStatus });
      toast.success(`Leave request ${newStatus}`);
    } catch (error) {
      console.error("Error updating leave request:", error);
      toast.error("Failed to update leave request.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 w-screen h-screen ">
      <h1 className="text-2xl font-bold mb-4 text-white">Faculty Dashboard - Leave Requests</h1>
      {leaveRequests.length === 0 ? (
        <p className="text-gray-600">No leave requests available.</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3">Student Name</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">End Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id} className="border-b text-center">
                <td className="p-3">{request.studentName}</td>
                <td className="p-3">{request.reason}</td>
                <td className="p-3">{request.startDate}</td>
                <td className="p-3">{request.endDate}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      request.status === "Approved"
                        ? "bg-green-200 text-green-700"
                        : request.status === "Rejected"
                        ? "bg-red-200 text-red-700"
                        : "bg-yellow-200 text-yellow-700"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => handleStatusUpdate(request.id, "Approved")}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(request.id, "Rejected")}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FacultyDashboard;
