// src/components/dashboard/AtRiskStudentsTable.jsx
import React from "react";
// import { Link } from 'react-router-dom'; // For future student detail page

const AtRiskStudentsTable = ({ students }) => {
  if (!students || students.length === 0) {
    return (
      <p className="text-gray-500 italic text-center py-4">
        No at-risk students found for the current selection.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      {" "}
      {/* Allows horizontal scrolling on small screens */}
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              User ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Course ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              School
            </th>
            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student, index) => (
            <tr
              key={student.user_id || index}
              className={
                index % 2 === 0 ? undefined : "bg-gray-50 hover:bg-gray-100"
              }
            >
              {/* Added hover effect to non-striped rows too */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {student.user_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.course_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.school}
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link to={`/student/${student.user_id}`} className="text-indigo-600 hover:text-indigo-900">
                  View Details
                </Link>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AtRiskStudentsTable;
