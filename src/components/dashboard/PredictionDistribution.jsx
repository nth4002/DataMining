import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PredictionDistributionChart = ({ data }) => {
  // Data from backend: [{ classification: 'Pass', count: 80 }, { classification: 'Fail', count: 20 }]
  // Transform for Recharts: [{ name: 'Pass', value: 80 }, { name: 'Fail', value: 20 }]
  const chartData = data.map((item) => ({
    name: item.classification,
    value: Number(item.count), // Ensure count is a number
  }));

  const COLORS = ["#00C49F", "#FF8042"]; // Pass, Fail

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default PredictionDistributionChart;
