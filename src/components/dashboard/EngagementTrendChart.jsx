// src/components/dashboard/EngagementTrendChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EngagementTrendChart = ({ data }) => {
  if (
    !data ||
    !data.pass_group ||
    !data.fail_group ||
    (!data.pass_group.questions_done && !data.pass_group.watch_time)
  ) {
    // Check if any data actually exists
    return (
      <p className="text-gray-500 italic text-center py-4">
        Engagement trend data not available.
      </p>
    );
  }

  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "After W4"];

  const questionData = weeks.map((week, index) => ({
    name: week,
    Pass: data.pass_group.questions_done?.[index] ?? 0, // Use ?? for nullish coalescing
    Fail: data.fail_group.questions_done?.[index] ?? 0,
  }));

  const watchTimeData = weeks.map((week, index) => ({
    name: week,
    Pass: data.pass_group.watch_time?.[index] ?? 0,
    Fail: data.fail_group.watch_time?.[index] ?? 0,
  }));

  // Define stroke colors
  const passColor = "#00C49F";
  const failColor = "#FF8042";

  return (
    <div className="space-y-8">
      {" "}
      {/* Space between the two charts */}
      <div>
        <h4 className="text-md font-semibold text-gray-700 mb-3">
          Average Questions Done Per Week
        </h4>
        <div className="w-full h-[300px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={questionData}
              margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#666" />
              <YAxis tick={{ fontSize: 12 }} stroke="#666" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Pass"
                stroke={passColor}
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="Fail"
                stroke={failColor}
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h4 className="text-md font-semibold text-gray-700 mb-3">
          Average Video Watch Time Per Week (Minutes)
        </h4>
        <div className="w-full h-[300px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={watchTimeData}
              margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#666" />
              <YAxis tick={{ fontSize: 12 }} stroke="#666" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Pass"
                stroke={passColor}
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="Fail"
                stroke={failColor}
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default EngagementTrendChart;
