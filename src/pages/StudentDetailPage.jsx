// src/pages/StudentDetailPage.jsx
import React, { useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  fetchUserEnrollments,
  fetchStudentCoursePerformance,
  selectCourseForDetailView,
} from "../features/studentDetail/studentDetailSlice";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const StudentDetailPage = () => {
  const { userId } = useParams();

  const [searchParams] = useSearchParams(); // <<<< Get searchParams
  const cameFromCourseId = searchParams.get("course"); // <<<< Read the 'course' query parameter
  const dispatch = useDispatch();

  const {
    profile,
    enrollments,
    selectedCoursePerformance,
    selectedCourseForDetailView,
  } = useSelector((state) => state.studentDetail);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
      dispatch(fetchUserEnrollments(userId));
    }
    // // Optional: Cleanup when component unmounts or userId changes
    // return () => {
    //   dispatch(clearStudentDetail());
    // };
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId && selectedCourseForDetailView) {
      dispatch(
        fetchStudentCoursePerformance({
          userId,
          courseId: selectedCourseForDetailView,
        })
      );
    }
  }, [userId, selectedCourseForDetailView, dispatch]);

  const handleCourseSelectionChange = (e) => {
    dispatch(selectCourseForDetailView(e.target.value || null));
  };

  if (profile.status === "loading" || enrollments.status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 text-lg">Loading student details...</p>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {/* Back Link Section */}
      {cameFromCourseId && ( // Only show if we know which course list to go back to
        <div className="mb-4">
          <Link
            to={`/courses/${cameFromCourseId}/students`}
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 group"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
            Back to Student List for Course {cameFromCourseId}
          </Link>
        </div>
      )}
      {/* If no cameFromCourseId, you might offer a generic link or different text */}
      {!cameFromCourseId && (
        <div className="mb-4">
          <Link
            to="/dashboard" // Fallback to main dashboard
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 group"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
            Back to Dashboard
          </Link>
        </div>
      )}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Student Profile:{" "}
          <span className="text-indigo-600">
            {profile.data?.name || userId}
          </span>
        </h2>
        {profile.data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong>User ID:</strong> {profile.data.user_id}
            </p>
            <p>
              <strong>Name:</strong> {profile.data.name || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong>{" "}
              {profile.data.gender === 0
                ? "Male"
                : profile.data.gender === 1
                ? "Female"
                : "N/A"}
            </p>{" "}
            {/* Adjust gender mapping */}
            <p>
              <strong>Year of Birth:</strong>{" "}
              {profile.data.year_of_birth || "N/A"}
            </p>
            <p>
              <strong>School:</strong> {profile.data.school || "N/A"}
            </p>
          </div>
        )}
      </section>

      <section className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Course Enrollments
        </h3>
        {enrollments.list.length > 0 ? (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="student-course-select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                View Detailed Performance for Course:
              </label>
              <select
                id="student-course-select"
                value={selectedCourseForDetailView || ""}
                onChange={handleCourseSelectionChange}
                className="mt-1 block w-full md:w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">-- Select a Course --</option>
                {enrollments.list.map((enrollment) => (
                  <option
                    key={enrollment.course_id}
                    value={enrollment.course_id}
                  >
                    {enrollment.course_name || enrollment.course_id} (Status:{" "}
                    {enrollment.classification})
                  </option>
                ))}
              </select>
            </div>

            {selectedCourseForDetailView &&
              selectedCoursePerformance.status === "loading" && (
                <p>Loading course performance...</p>
              )}
            {selectedCourseForDetailView && selectedCoursePerformance.data && (
              <div className="mt-6 p-4 border rounded-md">
                <h4 className="text-lg font-medium text-gray-800">
                  Performance in:{" "}
                  {enrollments.list.find(
                    (e) => e.course_id === selectedCourseForDetailView
                  )?.course_name || selectedCourseForDetailView}
                </h4>
                {/* Display weekly data from selectedCoursePerformance.data */}
                {/* Example: */}
                <p>
                  Total Watch Time:{" "}
                  {
                    selectedCoursePerformance.data
                      .total_watch_time_minutes_per_course
                  }{" "}
                  min
                </p>
                <p>
                  Classification:{" "}
                  {selectedCoursePerformance.data.classification}
                </p>
                {/* You would iterate over week1, week2 data here or build specific components/charts */}
                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                  {JSON.stringify(selectedCoursePerformance.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <p>No course enrollments found for this student.</p>
        )}
      </section>
    </div>
  );
};
export default StudentDetailPage;
