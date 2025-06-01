// src/pages/StudentDetailPage.jsx
import React, { useEffect } from "react";
import {
  useParams,
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  fetchUserEnrollments,
  fetchStudentCoursePerformance,
  selectCourseForDetailView,
  clearStudentDetail, // Make sure this is imported from your slice
} from "../features/studentDetail/studentDetailSlice";
import { fetchCourseDetail as fetchCourseMetadata } from "../features/courses/coursesSlice"; // For course metadata
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const StudentDetailPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cameFromCourseId = searchParams.get("course");
  const dispatch = useDispatch();

  const {
    profile,
    enrollments,
    selectedCoursePerformance,
    selectedCourseForDetailView,
  } = useSelector((state) => state.studentDetail);

  const { data: courseMetadata, status: courseMetaStatus } = useSelector(
    (state) => state.courses.currentCourse
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
      dispatch(fetchUserEnrollments(userId));
    }
    return () => {
      dispatch(clearStudentDetail());
    };
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId && selectedCourseForDetailView) {
      dispatch(
        fetchStudentCoursePerformance({
          userId,
          courseId: selectedCourseForDetailView,
        })
      );
      if (
        !courseMetadata ||
        courseMetadata.course_id !== selectedCourseForDetailView ||
        courseMetaStatus !== "succeeded"
      ) {
        dispatch(fetchCourseMetadata(selectedCourseForDetailView));
      }
    }
  }, [
    userId,
    selectedCourseForDetailView,
    dispatch,
    courseMetadata, // Keep as dependency to re-evaluate condition
    courseMetaStatus, // Keep as dependency
  ]);

  const handleCourseSelectionChange = (e) => {
    dispatch(selectCourseForDetailView(e.target.value || null));
  };

  const handleMoreInsightsClick = () => {
    if (userId && selectedCourseForDetailView) {
      navigate(
        `/student/${userId}/course-insights/${selectedCourseForDetailView}`
      );
    }
  };

  // Calculate Completion Percentage (moved inside the return or just before it, only when data is available)
  // This calculation will now happen only if selectedCoursePerformance.data and courseMetadata are available.

  if (profile.status === "loading" || enrollments.status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 text-lg">Loading student details...</p>
      </div>
    );
  }

  // Add error handling for profile.error and enrollments.error if desired
  if (profile.error || enrollments.error) {
    return (
      <div className="p-4 text-red-500 text-center">
        <p>
          Error loading student data:{" "}
          {profile.error?.toString() || enrollments.error?.toString()}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Link Section */}
      {cameFromCourseId ? (
        <div className="mb-4">
          <Link
            to={`/courses/${cameFromCourseId}/students`}
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 group"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
            Back to Student List for Course {cameFromCourseId}
          </Link>
        </div>
      ) : (
        <div className="mb-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 group"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
            Back to Dashboard
          </Link>
        </div>
      )}

      {/* Student Profile Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Student Profile:{" "}
          <span className="text-indigo-600">
            {profile.data?.name || userId}
          </span>
        </h2>
        {profile.status === "succeeded" &&
          profile.data && ( // Check for successful load
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
              </p>
              <p>
                <strong>Year of Birth:</strong>{" "}
                {profile.data.year_of_birth || "N/A"}
              </p>
              <p>
                <strong>School:</strong> {profile.data.school || "N/A"}
              </p>
            </div>
          )}
        {profile.status === "loading" && <p>Loading profile...</p>}
      </section>

      {/* Course Enrollments & Performance Section */}
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Course Enrollments & Performance
        </h3>
        {enrollments.status === "succeeded" && enrollments.list.length > 0 ? ( // Check for successful load
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
                <p className="text-gray-600 mt-4">
                  Loading course performance...
                </p>
              )}
            {selectedCourseForDetailView && selectedCoursePerformance.error && (
              <p className="text-red-500 mt-4">
                Error loading performance:{" "}
                {selectedCoursePerformance.error.toString()}
              </p>
            )}

            {/* MOVED performance details INSIDE this block */}
            {selectedCourseForDetailView &&
              selectedCoursePerformance.status === "succeeded" &&
              selectedCoursePerformance.data && (
                <div className="mt-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-medium text-gray-800">
                      Performance in:{" "}
                      {enrollments.list.find(
                        (e) => e.course_id === selectedCourseForDetailView
                      )?.course_name || selectedCourseForDetailView}
                    </h4>
                    <button
                      onClick={handleMoreInsightsClick}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800 px-3 py-1.5 rounded-md bg-indigo-50 hover:bg-indigo-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Engagement Charts →
                    </button>
                  </div>

                  {/* Progress Bar - Calculation needs to be inside this block or ensure data exists */}
                  {(() => {
                    // IIFE to calculate and render progress bar
                    let completionPercentage = 0;
                    let studentTotalQuestionsDone = 0;
                    if (courseMetadata && courseMetadata.num_exercises > 0) {
                      studentTotalQuestionsDone =
                        (selectedCoursePerformance.data.questions_done_week1 ||
                          0) +
                        (selectedCoursePerformance.data.questions_done_week2 ||
                          0) +
                        (selectedCoursePerformance.data.questions_done_week3 ||
                          0) +
                        (selectedCoursePerformance.data.questions_done_week4 ||
                          0) +
                        (selectedCoursePerformance.data
                          .questions_done_after_4weeks || 0);

                      completionPercentage = Math.min(
                        Math.round(
                          (studentTotalQuestionsDone /
                            courseMetadata.num_exercises) *
                            100
                        ),
                        100
                      );
                      return (
                        <div className="my-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Progress (Based on Exercises Done):
                          </label>
                          <div className="w-32 h-32 mx-auto sm:mx-0">
                            <CircularProgressbar
                              value={completionPercentage}
                              text={`${completionPercentage}%`}
                              styles={buildStyles({
                                textSize: "20px",
                                textColor: "#4A5568",
                                pathColor:
                                  completionPercentage > 75
                                    ? "#38A169"
                                    : completionPercentage > 40
                                    ? "#4299E1"
                                    : "#E53E3E",
                                trailColor: "#E2E8F0",
                              })}
                            />
                          </div>
                          <p className="text-xs text-gray-500 text-center sm:text-left mt-1">
                            {studentTotalQuestionsDone} /{" "}
                            {courseMetadata.num_exercises} exercises completed
                          </p>
                        </div>
                      );
                    }
                    return (
                      <p className="text-xs text-gray-500 my-4">
                        Progress data N/A (total exercises for course unknown or
                        no performance data).
                      </p>
                    );
                  })()}

                  <p>
                    Total Watch Time:{" "}
                    <span
                      className={`font-semibold ${
                        selectedCoursePerformance.data
                          .total_watch_time_minutes_per_course > 60 // Example threshold
                          ? "text-green-600"
                          : selectedCoursePerformance.data
                              .total_watch_time_minutes_per_course > 20
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedCoursePerformance.data
                        .total_watch_time_minutes_per_course ?? "N/A"}{" "}
                      min
                    </span>
                  </p>
                  <p>
                    Classification:{" "}
                    <span
                      className={`font-semibold ${
                        selectedCoursePerformance.data.classification === "Pass"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedCoursePerformance.data.classification}
                    </span>
                  </p>
                  {/* "Dig Deeper" button was changed to be next to the title above */}
                  <pre className="mt-4 p-2 bg-gray-200 rounded text-xs overflow-x-auto">
                    {JSON.stringify(selectedCoursePerformance.data, null, 2)}
                  </pre>
                </div>
              )}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            {enrollments.status === "loading"
              ? "Loading enrollments..."
              : "No course enrollments found for this student."}
          </p>
        )}
      </section>
    </div>
  );
};
export default StudentDetailPage;
