import React, { useEffect, useState } from "react";

const BudgetApprovalSystem = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("https://transparent-budget-default-rtdb.firebaseio.com/applications.json");
        const data = await response.json();

        if (data) {
          const formattedData = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setApplications(formattedData);
        } else {
          setApplications([]);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`https://transparent-budget-default-rtdb.firebaseio.com/applications/${id}.json`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      setApplications((prevApps) =>
        prevApps.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );

      alert(`Application ${newStatus}!`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="bg-[#1a1a2e] mt-10 p-6 rounded-lg shadow-lg text-white max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">🛠 Budget Approval System</h2>
      {applications.length === 0 ? (
        <p className="text-gray-400">No applications found.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app.id} className="bg-gray-800 p-4 rounded">
              <p><strong>👤 Name:</strong> {app.applicantName}</p>
              <p><strong>📌 Type:</strong> {app.applicationType}</p>
              <p><strong>💰 Requested Amount:</strong> {app.requestedAmount ? `₹${app.requestedAmount}` : "N/A"}</p>
              <p><strong>📅 Submitted On:</strong> {new Date(app.timestamp).toLocaleString()}</p>
              <p className={`font-semibold ${app.status === "Pending" ? "text-yellow-400" : app.status === "Approved" ? "text-green-400" : "text-red-400"}`}>
                <strong>📝 Status:</strong> {app.status}
              </p>
              {app.status === "Pending" && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => updateStatus(app.id, "Approved")}
                    className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600 transition duration-300"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => updateStatus(app.id, "Rejected")}
                    className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 transition duration-300"
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BudgetApprovalSystem;
