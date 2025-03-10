import { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { ref, push, onValue } from "firebase/database";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import { toast } from "react-toastify";

const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [formData, setFormData] = useState({
    studentName: "",
    leaveType: "Sick Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    const leaveRef = ref(db, "leaveRequests");
    onValue(leaveRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setLeaveRequests(formattedData);
      } else {
        setLeaveRequests([]);
      }
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (
      !formData.studentName ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.reason
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      toast.error("Start date cannot be after end date!");
      return;
    }

    const newRequest = {
      ...formData,
      status: "Pending",
    };

    try {
      await push(ref(db, "leaveRequests"), newRequest);
      setFormData({
        studentName: "",
        leaveType: "Sick Leave",
        startDate: "",
        endDate: "",
        reason: "",
      });
      toast.success("Leave request submitted successfully!");
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error("Failed to submit leave request.");
    }
  };

  return (
    <div className="bg-black p-14">
      <div className="max-w-3xl mx-auto p-6 bg-gray-900 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Leave Request Form
        </h2>

        {/* Leave Request Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-medium">
              Student Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter student name"
            />
          </div>

          <div>
            <label className="block text-white font-medium">
              Leave Type
            </label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            >
              <option>Sick Leave</option>
              <option>Casual Leave</option>
              <option>Annual Leave</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-white font-medium">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
            </div>

            <div className="w-1/2">
              <label className="block  text-white font-medium">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium">
              Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter reason for leave"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Request
          </button>
        </form>

        {/* Leave Requests Table */}
        {leaveRequests.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              Leave Requests
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">Student Name</th>
                    <th className="p-2 text-left">Leave Type</th>
                    <th className="p-2 text-left">Start Date</th>
                    <th className="p-2 text-left">End Date</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((request) => (
                    <tr key={request.id} className="border-t">
                      <td className="p-2">{request.studentName}</td>
                      <td className="p-2">{request.leaveType}</td>
                      <td className="p-2">{request.startDate}</td>
                      <td className="p-2">{request.endDate}</td>
                      <td className="p-2 flex items-center gap-2">
                        {request.status === "Approved" && (
                          <FaCheckCircle
                            className="text-green-500"
                            title="Approved"
                          />
                        )}
                        {request.status === "Rejected" && (
                          <FaTimesCircle
                            className="text-red-500"
                            title="Rejected"
                          />
                        )}
                        {request.status === "Pending" && (
                          <FaClock
                            className="text-yellow-500"
                            title="Pending"
                          />
                        )}
                        {request.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequest;
