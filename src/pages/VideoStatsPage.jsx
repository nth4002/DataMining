// src/pages/VideoStatsPage.jsx
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseVideoStats } from "../features/dashboard/dashboardSlice";
import { fetchCourseDetail } from "../features/courses/coursesSlice"; // For course name
import KpiCard from "../components/dashboard/KpiCard.jsx"; // Re-use KpiCard
import { ArrowLeftIcon } from "@heroicons/react/24/solid"; // Optional: for a back icon
const VideoStatsPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const {
    data: videoStats,
    status,
    error,
  } = useSelector((state) => state.dashboard.courseVideoStats);
  const { data: currentCourseDetails } = useSelector(
    (state) => state.courses.currentCourse
  );
  const selectedSchool = useSelector((state) => state.dashboard.selectedSchool); // If you want school filter consistency

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseVideoStats({ courseId, school: selectedSchool }));
      if (
        !currentCourseDetails ||
        currentCourseDetails.course_id !== courseId
      ) {
        dispatch(fetchCourseDetail(courseId));
      }
    }
  }, [courseId, selectedSchool, dispatch, currentCourseDetails]);

  if (status === "idle" || status === "loading")
    return <p className="text-center py-4">Loading video statistics...</p>;
  if (error)
    return (
      <div className="text-center py-4 space-y-4">
        <Link
          to="/dashboard"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>
        <p className="text-red-500 bg-red-50 p-4 rounded-md">
          Error loading video statistics: {error.toString()}
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
        Video Statistics for Course:{" "}
        <span className="text-indigo-600">
          {currentCourseDetails?.name || courseId}
        </span>
      </h2>

      {videoStats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <KpiCard
            title="Students with Video Data"
            value={videoStats.studentsWithRecords}
          />
          <KpiCard
            title="Avg. Watch Time per Video (Course)"
            value={`${videoStats.courseAvgWatchTimePerVideo} min`}
          />
          <KpiCard
            title="Avg. Total Watch Time (Course)"
            value={`${videoStats.courseAvgTotalWatchTime} min`}
          />
          <KpiCard
            title="Median Total Watch Time (Course)"
            value={`${videoStats.medianTotalWatchTime} min`}
          />
          <KpiCard
            title="Sum of All Watch Time (Course)"
            value={`${videoStats.courseSumTotalWatchTime} min`}
          />
        </div>
      ) : (
        <p>No video statistics available for this course.</p>
      )}

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-300 rounded-md text-yellow-700">
        <p className="font-semibold">Note:</p>
        <p className="text-sm">
          These statistics are aggregated at the course level based on student
          data. They do not represent individual video performance. For more
          detailed video analytics, granular per-video tracking data would be
          required.
        </p>
      </div>
    </div>
  );
};

export default VideoStatsPage;
