import React from "react";
import { FaBox, FaTruck, FaDollarSign } from "react-icons/fa";
import ShowComplaints from "./ShowComplaints";
import BudgetApprovalChart from "./BudgetApprovalChart";
import BudgetViewRequests from "./BudgetViewRequests";
import { FaFileAlt, FaCheckCircle, FaTimesCircle, FaUsers } from "react-icons/fa";

function Dashboard() {
  return (
    <div className=" p-6 bg-[#1a1a2e] min-h-screen text-white">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
      {[
          { label: "Total Applications", value: 5, icon: <FaFileAlt /> },
          { label: "Approved Applications", value: 3, icon: <FaCheckCircle /> },
          { label: "Rejected Applications", value: 2, icon: <FaTimesCircle /> },
          { label: "Total Users Online", value: 1, icon: <FaUsers /> },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-[#252545] rounded-lg shadow-md"
          >
            <div className="text-3xl text-blue-400 mr-4">{item.icon}</div>
            <div>
              <p className="text-gray-400">{item.label}</p>
              <p className="text-xl font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Budget Approval Chart */}
      <div className="p-4 bg-[#252545] rounded-lg shadow-lg mb-6">
        <BudgetApprovalChart />
      </div>

      {/* Recent Orders & Complaints Section */}
      <div className="flex gap-6 w-full">
        <div className="p-4 bg-[#252545] rounded-lg shadow-lg flex-[7]">
          <BudgetViewRequests />
        </div>
        <div className="p-4 bg-[#252545] rounded-lg shadow-lg flex-[3]">
          <ShowComplaints />
        </div>

        
      </div>
    </div>
  );
}

export default Dashboard;
