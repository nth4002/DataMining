// src/pages/CourseEngagementPage.jsx
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEngagementTrends } from "../features/dashboard/dashboardSlice"; // Assuming trends are for selected course
import { fetchCourseDetail } from "../features/courses/coursesSlice"; // To get course name
import EngagementTrendChart from "../components/dashboard/EngagementTrendChart.jsx";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
const CourseEngagementPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const {
    data: engagementTrends,
    status,
    error,
  } = useSelector((state) => state.dashboard.engagementTrends);
  const { data: currentCourseDetails } = useSelector(
    (state) => state.courses.currentCourse
  );
  const selectedSchool = useSelector((state) => state.dashboard.selectedSchool);

  useEffect(() => {
    if (courseId) {
      const params = { course_id: courseId };
      if (selectedSchool) params.school = selectedSchool;
      dispatch(fetchEngagementTrends(params));
      if (
        !currentCourseDetails ||
        currentCourseDetails.course_id !== courseId
      ) {
        dispatch(fetchCourseDetail(courseId)); // Fetch course name if not already loaded
      }
    }
  }, [courseId, selectedSchool, dispatch, currentCourseDetails]);

  if (status === "idle" || status === "loading")
    return <p className="text-center py-4">Loading engagement trends...</p>;
  if (error)
    return (
      <div className="text-center py-4">
        <Link
          to="/dashboard"
          className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>
        <p className="text-red-500 bg-red-50 p-4 rounded-md">
          Error loading trends: {error.toString()}
        </p>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="mb-4">
        {" "}
        {/* Container for the back link */}
        <Link
          to="/dashboard" // Always navigates to the main dashboard overview
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
          Back to Dashboard Overview
        </Link>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">
        Course Engagement Analytics:{" "}
        <span className="text-indigo-600">
          {currentCourseDetails?.name || courseId}
        </span>
      </h2>
      <section className="bg-white shadow-lg rounded-lg p-6">
        {engagementTrends ? (
          <EngagementTrendChart data={engagementTrends} />
        ) : (
          <p>No engagement data available for this course.</p>
        )}
      </section>
    </div>
  );
};
export default CourseEngagementPage;
