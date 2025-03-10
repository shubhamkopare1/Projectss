import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { PieChart, Pie, Cell } from "recharts";

const BudgetApprovalChart = () => {
  const [chartData, setChartData] = useState([]);
  const [totalApproved, setTotalApproved] = useState(0);
  const [highestCategory, setHighestCategory] = useState("");
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    const fetchApprovedAmounts = async () => {
      try {
        const response = await fetch(
          "https://transparent-budget-default-rtdb.firebaseio.com/applications.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        if (data) {
          // Filter approved applications and group by month
          const approvedApplications = Object.values(data).filter(
            (app) => app.status === "Approved"
          );

          const monthlyData = Array(12).fill(0);
          let total = 0;
          let categoryCounts = {};

          approvedApplications.forEach((app) => {
            if (app.timestamp && app.requestedAmount) {
              const date = new Date(app.timestamp);
              const year = date.getFullYear();
              const currentYear = new Date().getFullYear();

              if (year === currentYear) {
                const month = date.getMonth();
                monthlyData[month] += app.requestedAmount;
                total += app.requestedAmount;

                // Track highest spending category
                if (app.applicationType) {
                  categoryCounts[app.applicationType] = (categoryCounts[app.applicationType] || 0) + app.requestedAmount;
                }
              }
            }
          });

          const highestSpendingCategory = Object.keys(categoryCounts).reduce((a, b) => 
            categoryCounts[a] > categoryCounts[b] ? a : b, "N/A");

          const formattedData = monthlyData.map((amount, index) => ({
            month: new Date(2024, index).toLocaleString("default", { month: "short" }),
            amount,
          }));

          setChartData(formattedData);
          setTotalApproved(total);
          setHighestCategory(highestSpendingCategory);
        }
      } catch (error) {
        console.error("Error fetching budget approvals:", error);
      }
    };

    fetchApprovedAmounts();
  }, []);

  return (
    <div className="bg-[#394867] text-white p-6 rounded-xl shadow-lg w-full flex flex-col md:flex-row">
      {/* Chart Section */}
      <div className="w-full md:w-2/3">
        <h2 className="text-2xl font-bold mb-4">📊 Approved Budget (This Year)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#556987" />
            <XAxis dataKey="month" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#00C49F" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Side Summary Section */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center mt-6 md:mt-0">
        <PieChart width={150} height={150}>
          <Pie
            data={[{ name: "Total", value: totalApproved }]}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {COLORS.map((color, index) => (
              <Cell key={index} fill={color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <p className="text-center text-lg font-semibold mt-2">Total: ₹{totalApproved}</p>
        <p className="text-center text-sm text-gray-300">Most Expensive Category: <span className="font-bold">{highestCategory}</span></p>
      </div>
    </div>
  );
};

export default BudgetApprovalChart;
