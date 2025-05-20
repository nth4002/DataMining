import React from "react";

const KpiCard = ({ title, value, icon }) => {
  // Basic styling, you'll want to make this look better
  const cardStyle = {
    border: "1px solid #eee",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "150px",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };
  const titleStyle = { fontSize: "0.9em", color: "#555", marginBottom: "5px" };
  const valueStyle = { fontSize: "1.8em", fontWeight: "bold" };

  return (
    <div style={cardStyle}>
      {icon && <span>{icon}</span>}
      <div style={titleStyle}>{title}</div>
      <div style={valueStyle}>
        {value !== undefined && value !== null ? value : "-"}
      </div>
    </div>
  );
};
export default KpiCard;
