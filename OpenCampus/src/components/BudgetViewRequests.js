import React, { useEffect, useState } from "react";

const BudgetViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // Track expanded description

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "https://transparent-budget-default-rtdb.firebaseio.com/applications.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        if (data) {
          const formattedData = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setRequests(formattedData);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">📜 Budget Approval Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="px-4 py-2">Applicant</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Amount (₹)</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request.id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{request.applicantName}</td>
                  <td className="px-4 py-2">{request.applicationType}</td>
                  <td className="px-4 py-2">{request.requestedAmount || "N/A"}</td>
                  <td
                    className={`px-4 py-2 font-bold ${
                      request.status === "Approved"
                        ? "text-green-400"
                        : request.status === "Pending"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {request.status}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(request.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === request.id ? null : request.id)
                      }
                      className="text-blue-400 hover:underline"
                    >
                      {expandedId === request.id ? "Hide" : "View"}
                    </button>
                    {expandedId === request.id && (
                      <p className="mt-2 bg-gray-700 p-2 rounded">
                        {request.description}
                      </p>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No requests available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetViewRequests;
