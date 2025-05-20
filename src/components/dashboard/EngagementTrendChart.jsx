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
  // Expected data structure from backend (after processing in dashboardSlice or here):
  // data = {
  //   pass_group: { questions_done: [avg_w1, avg_w2, ...], watch_time: [...] },
  //   fail_group: { questions_done: [avg_w1, avg_w2, ...], watch_time: [...] }
  // }

  if (!data || !data.pass_group || !data.fail_group) {
    return <p>Engagement trend data not available or in unexpected format.</p>;
  }

  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "After W4"];

  const questionData = weeks.map((week, index) => ({
    name: week,
    Pass: data.pass_group.questions_done?.[index] || 0,
    Fail: data.fail_group.questions_done?.[index] || 0,
  }));

  const watchTimeData = weeks.map((week, index) => ({
    name: week,
    Pass: data.pass_group.watch_time?.[index] || 0,
    Fail: data.fail_group.watch_time?.[index] || 0,
  }));

  const chartStyle = { marginBottom: "30px" };

  return (
    <div>
      <div style={chartStyle}>
        <h4>Average Questions Done Per Week</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={questionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Pass"
              stroke="#00C49F"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="Fail" stroke="#FF8042" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={chartStyle}>
        <h4>Average Video Watch Time Per Week (Minutes)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={watchTimeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Pass"
              stroke="#00C49F"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="Fail" stroke="#FF8042" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default EngagementTrendChart;
