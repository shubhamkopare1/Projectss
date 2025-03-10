import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const LeaveRequestsChart = () => {
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const leaveRef = ref(db, "leaveRequests");

    onValue(leaveRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // Format data for the chart
        const formattedData = Object.keys(data).map((key) => ({
          date: data[key].date,
          approved: data[key].status === "Approved" ? 1 : 0,
          pending: data[key].status === "Pending" ? 1 : 0,
          rejected: data[key].status === "Rejected" ? 1 : 0,
        }));

        setLeaveData(formattedData);
      }
    });
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-3">Leave Requests Trend 📊</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={leaveData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="approved" stroke="#4CAF50" strokeWidth={2} name="Approved" />
          <Line type="monotone" dataKey="pending" stroke="#FFC107" strokeWidth={2} name="Pending" />
          <Line type="monotone" dataKey="rejected" stroke="#F44336" strokeWidth={2} name="Rejected" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeaveRequestsChart;
