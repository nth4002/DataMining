// src/components/dashboard/PredictionDistributionChart.jsx
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
  if (!data || data.length === 0) {
    return (
      <p className="text-gray-500 italic text-center py-4">
        No prediction data available.
      </p>
    );
  }

  const chartData = data.map((item) => ({
    name: item.classification,
    value: Number(item.count),
  }));

  const COLORS = {
    Pass: "#00C49F", // Greenish
    Fail: "#FF8042", // Orangish
    // Add more colors if you have more classifications
  };

  return (
    // ResponsiveContainer handles sizing, Tailwind can be used for margins or wrapper if needed
    <div className="w-full h-[300px] sm:h-[350px]">
      {" "}
      {/* Explicit height for the container */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius="80%" // Make radius responsive to container
            fill="#8884d8" // Default fill, overridden by Cell
            dataKey="value"
            label={({ name, percent, value }) =>
              `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name] || "#cccccc"}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value} students`, name]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default PredictionDistributionChart;
