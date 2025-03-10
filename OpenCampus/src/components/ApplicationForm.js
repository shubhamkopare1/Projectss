import React, { useState } from "react";
import ApplicationsList from "./ApplicationsList";

const ApplicationForm = () => {
  const [applicantName, setApplicantName] = useState("");
  const [applicationType, setApplicationType] = useState("Event Organization"); // Default type
  const [requestedAmount, setRequestedAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure applicationType is correctly assigned
    const selectedType = applicationType || "Event Organization";

    const newApplication = {
      applicantName,
      applicationType: selectedType, // Make sure it's stored
      requestedAmount: requestedAmount ? parseFloat(requestedAmount) : 0,
      description,
      status: "Pending",
      timestamp: new Date().toISOString(),
    };

    console.log("Submitting Application:", newApplication); // Debugging log

    try {
      const response = await fetch(
        "https://transparent-budget-default-rtdb.firebaseio.com/applications.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newApplication),
        }
      );

      if (response.ok) {
        alert("Application submitted successfully!");
        setApplicantName("");
        setApplicationType("Event Organization"); // Reset to default
        setRequestedAmount("");
        setDescription("");
      } else {
        alert("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black backdrop:blur-3xl">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white max-w-md w-full mt-10 ">
        <h2 className="text-2xl font-semibold mb-4">📌 Submit Application</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Applicant Name */}
          <div>
            <label className="block mb-1">👤 Your Name</label>
            <input
              type="text"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Enter Your Name"
            />
          </div>

          {/* Application Type */}
          <div>
            <label className="block mb-1">📄 Application Type</label>
            <select
              value={applicationType}
              onChange={(e) => setApplicationType(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-400"
            >
              <option value="Event Organization">Event Organization</option>
              <option value="Budget Approval">Budget Approval</option>
              <option value="Sponsorship">Sponsorship</option>
            </select>
          </div>

          {/* Requested Amount */}
          <div>
            <label className="block mb-1">💰 Requested Amount</label>
            <input
              type="number"
              value={requestedAmount}
              onChange={(e) => setRequestedAmount(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-400"
              placeholder="Enter amount in ₹Rupees"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1">📝 Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="Enter details about your request..."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition duration-200"
          >
            🚀 Submit Application
          </button>
        </form>

        <div className="mt-6">
          <ApplicationsList />
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
