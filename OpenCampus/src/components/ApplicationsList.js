import React, { useEffect, useState } from "react";

const ApplicationsList = () => {
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

          formattedData.sort((a, b) => a.timestamp - b.timestamp); // Sort oldest first
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

  return (
    <div className="bg-[#1a1a2e] p-6 rounded-lg shadow-lg text-white max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">📋 Submitted Applications</h2>
      {applications.length === 0 ? (
        <p className="text-gray-400">No applications found.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app.id} className="bg-gray-800 p-4 rounded">
              <p><strong>👤 Name:</strong> {app.applicantName}</p>
              <p><strong>📌 Type:</strong> {app.applicationType}</p>
              <p><strong>📅 Submitted On:</strong> {new Date(app.timestamp).toLocaleString()}</p>
              <p className={`font-semibold ${app.status === "Pending" ? "text-yellow-400" : app.status === "Approved" ? "text-green-400" : "text-red-400"}`}>
                <strong>📝 Status:</strong> {app.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicationsList;
