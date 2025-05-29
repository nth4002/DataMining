// src/pages/StudentListPage.jsx
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseStudents } from "../features/courses/coursesSlice";
// You can create a more specific table component or adapt AtRiskStudentsTable
// import StudentListTable from '../components/students/StudentListTable.jsx';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
const StudentListPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const {
    list: students,
    status,
    error,
  } = useSelector((state) => state.courses.courseStudents);
  const courses = useSelector((state) => state.courses.list);
  const currentCourse = courses.find((c) => c.course_id === courseId);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseStudents(courseId));
    }
  }, [courseId, dispatch]);

  if (status === "loading")
    return <p className="text-center py-4">Loading students...</p>;
  if (error)
    return (
      <div className="text-center py-4 space-y-4">
        <Link
          to="/dashboard" // Or to={`/dashboard?course=${courseId}`} if you wanted to pass it explicitly, but Redux state should handle it
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>
        <p className="text-red-500 bg-red-50 p-4 rounded-md">
          Error loading students: {error.toString()}
        </p>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="mb-4">
        {" "}
        {/* Container for the back link */}
        <Link
          to="/dashboard" // This link goes to the dashboard. The dashboard will use the selectedCourseId from Redux.
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
          Back to Dashboard ({currentCourse?.name || courseId})
        </Link>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">
        Students in Course:{" "}
        <span className="text-indigo-600">
          {currentCourse?.name || courseId}
        </span>
      </h2>
      {students.length === 0 && status === "succeeded" ? (
        <p className="text-gray-500">No students found for this course.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-2 md:p-0">
          {" "}
          {/* Minimal padding on container if table has its own */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                {/* Add Name column if you fetch it */}
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  School
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prediction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.user_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.user_id}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.name || 'N/A'}</td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.school}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                      student.classification === "Pass"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {student.classification}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/student/${student.user_id}?course=${courseId}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default StudentListPage;
