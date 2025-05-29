// src/components/dashboard/KpiCard.jsx
import React from "react";
import { Link } from "react-router-dom";
// Example: Import an icon from Heroicons for the details indicator
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"; // Or use UsersIcon for the main icon

const KpiCard = ({ title, value, icon, detailsLink }) => {
  const cardContent = (
    <>
      {/* Container for Title and Details Link Icon */}
      <div className="flex justify-between items-start mb-1">
        <div className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider text-left">
          {title}
        </div>
        {detailsLink && (
          <ArrowTopRightOnSquareIcon className="h-4 w-4 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
        )}
      </div>

      {/* Main Icon (passed as prop) */}
      {icon && (
        <div className="text-indigo-500 my-3 text-4xl mx-auto group-hover:text-indigo-600 transition-colors">
          {icon}
        </div>
      )}

      {/* Value */}
      <div
        className={`mt-1 text-3xl sm:text-4xl font-semibold text-gray-900 ${
          !icon ? "pt-6 pb-2" : ""
        }`}
      >
        {/* Added padding if no main icon to keep vertical balance */}
        {value !== undefined && value !== null ? value : "-"}
      </div>
    </>
  );

  // Base classes for the card appearance
  // Added `group` here so children can react to hover on the card (if it's a Link)
  const baseClasses =
    "bg-white shadow-lg rounded-xl p-5 text-center flex flex-col h-full group";

  if (detailsLink) {
    return (
      <Link
        to={detailsLink}
        className={`${baseClasses} transition-all duration-200 ease-in-out transform hover:scale-[1.03] hover:shadow-xl cursor-pointer`}
      >
        {cardContent}
      </Link>
    );
  }

  // Render as a simple div if not linkable
  return (
    <div className={`${baseClasses.replace("group", "")} cursor-default`}>
      {" "}
      {/* Remove group and add cursor-default if not a link */}
      {cardContent}
    </div>
  );
};

export default KpiCard;
