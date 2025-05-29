// src/pages/DashboardPage.jsx
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import CourseFilter from "../features/courses/CourseFilter.jsx";
import {
  fetchDashboardKpis,
  fetchPredictionDistribution,
  fetchAtRiskSnapshot,
  fetchEngagementTrends,
} from "../features/dashboard/dashboardSlice";
import {
  fetchCourseDetail,
  clearCurrentCourse,
} from "../features/courses/coursesSlice";

import KpiCard from "../components/dashboard/KpiCard.jsx";
// Ensure this import path and component name matches your file
import PredictionDistributionChart from "../components/dashboard/PredictionDistribution.jsx";
import AtRiskStudentsTable from "../components/dashboard/AtRiskStudentsTable.jsx";
import EngagementTrendChart from "../components/dashboard/EngagementTrendChart.jsx";

// Import the icons you want to use from Heroicons
import {
  UsersIcon,
  ChartPieIcon, // Example for Predicted Pass Rate
  ExclamationTriangleIcon, // Example for At-Risk Students
} from "@heroicons/react/24/outline"; // Or /24/solid for filled icons
const DashboardPage = () => {
  const dispatch = useDispatch();
  const selectedCourseId = useSelector(
    (state) => state.courses.selectedCourseId
  );
  const coursesList = useSelector((state) => state.courses.list); // Used to find the full course object
  const selectedSchool = useSelector((state) => state.dashboard.selectedSchool);

  const { data: currentCourseDetails, status: courseDetailStatus } =
    useSelector((state) => state.courses.currentCourse);
  const { kpis, predictionDistribution, atRiskSnapshot } = useSelector(
    (state) => state.dashboard
  );

  // -- START DEBUGGING --
  // Log right after selecting from store
  console.log(
    "DashboardPage RENDER - selectedCourseId from Redux:",
    selectedCourseId
  );

  // Use useLayoutEffect to log immediately before the DOM is painted,
  // after state is set but before the main useEffect might have run.
  useLayoutEffect(() => {
    console.log(
      "DashboardPage LAYOUT EFFECT - selectedCourseId:",
      selectedCourseId
    );
  }, [selectedCourseId]);

  // -- END DEBUGGING --
  useEffect(() => {
    console.log(
      "DashboardPage MAIN EFFECT - selectedCourseId:",
      selectedCourseId,
      "Dispatching actions..."
    );
    if (selectedCourseId) {
      const params = { course_id: selectedCourseId };
      if (selectedSchool) params.school = selectedSchool;

      dispatch(fetchDashboardKpis(params));
      dispatch(fetchPredictionDistribution(params));
      dispatch(fetchAtRiskSnapshot(params));
      // dispatch(fetchEngagementTrends(params));
      dispatch(fetchCourseDetail(selectedCourseId));
    } else {
      dispatch(clearCurrentCourse());
    }
  }, [selectedCourseId, selectedSchool, dispatch]);

  // Determine the display name for the course
  // Try currentCourseDetails first, then selectedCourseObject, then just the ID
  let courseDisplayName = selectedCourseId;
  if (currentCourseDetails && currentCourseDetails.name) {
    courseDisplayName = currentCourseDetails.name;
  } else {
    const selectedCourseObjectFromList = coursesList.find(
      (c) => c.course_id === selectedCourseId
    );
    if (selectedCourseObjectFromList && selectedCourseObjectFromList.name) {
      courseDisplayName = selectedCourseObjectFromList.name;
    }
  }

  if (!selectedCourseId) {
    console.log("DashboardPage RENDER - Showing 'Please select a course'");
    return (
      <div className="py-8 text-center">
        <CourseFilter />
        <p className="mt-4 text-gray-600">
          Please select a course to view dashboard data.
        </p>
      </div>
    );
  }

  console.log(
    "DashboardPage RENDER - Showing full dashboard for:",
    courseDisplayName
  );
  return (
    <div className="space-y-8">
      {" "}
      {/* Overall vertical spacing for sections */}
      <CourseFilter />
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
        Dashboard for:{" "}
        <span className="text-indigo-600">
          {courseDisplayName || "Selected Course"}
        </span>
      </h2>
      {/* Navigation Links to Deeper Dive Pages */}
      <div className="my-6 flex flex-wrap gap-4 justify-center md:justify-start">
        <Link
          to={`/courses/${selectedCourseId}/engagement`}
          className="bg-sky-500 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-150 ease-in-out"
        >
          View Course Engagement
        </Link>
        <Link
          to={`/courses/${selectedCourseId}/video-stats`}
          className="bg-teal-500 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-150 ease-in-out"
        >
          View Video Stats
        </Link>
      </div>
      {/* Course Information Section */}
      {courseDetailStatus === "loading" && (
        <p className="text-gray-600">Loading course details...</p>
      )}
      {courseDetailStatus === "failed" && (
        <p className="text-red-500">Error loading course details.</p>
      )}
      {courseDetailStatus === "succeeded" && currentCourseDetails && (
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
            Course Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-600">
            <p>
              <strong>Field:</strong> {currentCourseDetails.field || "N/A"}
            </p>
            <p>
              <strong>Videos:</strong>{" "}
              {currentCourseDetails.num_videos ?? "N/A"}
            </p>
            <p>
              <strong>Exercises:</strong>{" "}
              {currentCourseDetails.num_exercises ?? "N/A"}
            </p>
            <p className="md:col-span-2">
              <strong>Prerequisites:</strong>{" "}
              {currentCourseDetails.prerequisites || "N/A"}
            </p>
            <p className="md:col-span-2">
              <strong>About:</strong> {currentCourseDetails.about || "N/A"}
            </p>
          </div>
        </section>
      )}
      {/* Row 1: KPIs Section */}
      <section>
        {kpis.status === "loading" && (
          <p className="text-gray-600 p-4 text-center">Loading KPIs...</p>
        )}
        {kpis.error && (
          <p className="text-red-500 p-4 text-center bg-red-50 rounded-md">
            Error KPIs: {kpis.error.toString()}
          </p>
        )}
        {kpis.status === "succeeded" && kpis.data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Make the Total Students KPI Card a Link */}

            <KpiCard
              title="Total Students"
              value={kpis.data.totalStudents}
              detailsLink={`/courses/${selectedCourseId}/students`}
              icon={<UsersIcon className="h-10 w-10" />}
            />

            <KpiCard
              title="Predicted Pass Rate"
              value={`${kpis.data.predictedPassRate?.toFixed(1)}%`}
              icon={<ChartPieIcon className="h-10 w-10" />}
            />
            <KpiCard
              title="At-Risk Students"
              value={kpis.data.atRiskStudentCount}
              icon={<ExclamationTriangleIcon className="h-10 w-10" />}
            />
          </div>
        )}
      </section>
      {/* Row 2: Prediction Distribution & At-Risk Snapshot Section */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 items-start">
        {/* Prediction Distribution */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Prediction Distribution
          </h3>
          {predictionDistribution.status === "loading" && (
            <p className="text-gray-600">Loading chart...</p>
          )}
          {predictionDistribution.error && (
            <p className="text-red-500">
              Error Chart: {predictionDistribution.error.toString()}
            </p>
          )}
          {predictionDistribution.status === "succeeded" &&
            predictionDistribution.data &&
            predictionDistribution.data.length > 0 && (
              <PredictionDistributionChart data={predictionDistribution.data} />
            )}
          {predictionDistribution.status === "succeeded" &&
            (!predictionDistribution.data ||
              predictionDistribution.data.length === 0) && (
              <p className="text-gray-500">No prediction data available.</p>
            )}
        </div>

        {/* At-Risk Snapshot */}
        <div className="lg:col-span-3 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            At-Risk Students Snapshot
          </h3>
          {atRiskSnapshot.status === "loading" && (
            <p className="text-gray-600">Loading students...</p>
          )}
          {atRiskSnapshot.error && (
            <p className="text-red-500">
              Error Students: {atRiskSnapshot.error.toString()}
            </p>
          )}
          {atRiskSnapshot.status === "succeeded" && atRiskSnapshot.data && (
            <AtRiskStudentsTable students={atRiskSnapshot.data} />
          )}
        </div>
      </section>
      {/* Row 3: Engagement Trends Section
      <section className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Engagement Trends
        </h3>
        {engagementTrends.status === "loading" && (
          <p className="text-gray-600">Loading trends...</p>
        )}
        {engagementTrends.error && (
          <p className="text-red-500">
            Error Trends: {engagementTrends.error.toString()}
          </p>
        )}
        {engagementTrends.status === "succeeded" && engagementTrends.data && (
          <EngagementTrendChart data={engagementTrends.data} />
        )}
      </section> */}
    </div>
  );
};

export default DashboardPage;
