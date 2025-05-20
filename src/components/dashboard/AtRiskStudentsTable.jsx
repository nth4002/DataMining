import React from "react";
// import { Link } from 'react-router-dom'; // For future student detail page

const AtRiskStudentsTable = ({ students }) => {
  if (!students || students.length === 0) {
    return <p>No at-risk students found for the current selection.</p>;
  }
  // Basic table styling
  const tableStyle = { width: "100%", borderCollapse: "collapse" };
  const thStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    background: "#f2f2f2",
    textAlign: "left",
  };
  const tdStyle = { border: "1px solid #ddd", padding: "8px" };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>User ID</th>
          <th style={thStyle}>Course ID</th>
          <th style={thStyle}>School</th>
          {/* <th style={thStyle}>Actions</th> */}
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.user_id}>
            <td style={tdStyle}>{student.user_id}</td>
            <td style={tdStyle}>{student.course_id}</td>
            <td style={tdStyle}>{student.school}</td>
            {/* <td style={tdStyle}><Link to={`/student/${student.user_id}`}>View Details</Link></td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default AtRiskStudentsTable;
