import React, { useEffect } from "react";
// useDispatch: used for dispatching actions to the Redux store.
// useSelector: used for readinbg state from the Redux store.
import { useDispatch, useSelector } from "react-redux"; // redux hooks
// CourseFilter: a UI component that probably renders a dropdown or list to select a course.
import CourseFilter from "../features/courses/CourseFilter";
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
// Import your dashboard components
import KpiCard from "../components/dashboard/KpiCard";
import PredictionDistributionChart from "../components/dashboard/PredictionDistribution";
import AtRiskStudentsTable from "../components/dashboard/AtRiskStudentsTable";
import EngagementTrendChart from "../components/dashboard/EngagementTrendChart";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const selectedCourseId = useSelector(
    (state) => state.courses.selectedCourseId
  );

  const coursesList = useSelector((state) => state.courses.list);
  const selectedCourseObject = coursesList.find(
    (c) => c.course_id === selectedCourseId
  );

  const selectedSchool = useSelector((state) => state.dashboard.selectedSchool); // If using school filter

  const { data: currentCourseDetails, status: courseDetailStatus } =
    useSelector((state) => state.courses.currentCourse);

  const { kpis, predictionDistribution, atRiskSnapshot, engagementTrends } =
    useSelector((state) => state.dashboard);

  // use effect to fetch data when the component mounts or when selectedCourse changes
  useEffect(() => {
    // console.log(
    //   "DashboardPage - useEffect triggered. selectedCourseId:",
    //   selectedCourseId
    // ); // DEBUG
    if (selectedCourseId) {
      // Only fetch if a course is selected
      const params = { course_id: selectedCourseId };
      if (selectedSchool) params.school = selectedSchool;
      // console.log(params);
      dispatch(fetchDashboardKpis(params));
      dispatch(fetchPredictionDistribution(params));
      dispatch(fetchAtRiskSnapshot(params));
      dispatch(fetchEngagementTrends(params));
      dispatch(fetchCourseDetail(selectedCourseId));
    } else {
      dispatch(clearCurrentCourse()); // Clear details if no course is selected
    }
    // Add dependencies for re-fetching when filters change
  }, [selectedCourseId, selectedSchool, dispatch]);

  if (!selectedCourseId) {
    return (
      <div>
        <CourseFilter />
        <p>Please select a course to view dashboard data.</p>
      </div>
    );
  }

  const courseDisplayName = selectedCourseObject
    ? selectedCourseObject.course_id
    : selectedCourseId;

  return (
    <div>
      <CourseFilter />

      <h2>Dashboard for {courseDisplayName || "Selected Course"}</h2>

      {/* Display more course details if available */}
      {selectedCourseId &&
        courseDetailStatus === "succeeded" &&
        currentCourseDetails && (
          <div
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            <h4>Course Information:</h4>
            <p>
              <strong>Field:</strong> {currentCourseDetails.field || "N/A"}
            </p>
            <p>
              <strong>About:</strong> {currentCourseDetails.about || "N/A"}
            </p>
            <p>
              <strong>Prerequisites:</strong>{" "}
              {currentCourseDetails.prerequisites || "N/A"}
            </p>
            <p>
              <strong>Videos:</strong>{" "}
              {currentCourseDetails.num_videos ?? "N/A"},{" "}
              <strong>Exercises:</strong>{" "}
              {currentCourseDetails.num_exercises ?? "N/A"}
            </p>
          </div>
        )}

      {/* Row 1: KPIs */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {kpis.status === "loading" && <p>Loading KPIs...</p>}
        {kpis.error && <p>Error KPIs: {kpis.error}</p>}
        {kpis.status === "succeeded" && kpis.data && (
          <>
            <KpiCard title="Total Students" value={kpis.data.totalStudents} />
            <KpiCard
              title="Predicted Pass Rate"
              // The `.toFixed(1)` method in JavaScript converts a number to a string, keeping **one digit after the decimal point
              value={`${kpis.data.predictedPassRate?.toFixed(1)}%`}
            />
            <KpiCard
              title="At-Risk Students"
              value={kpis.data.atRiskStudentCount}
            />
          </>
        )}
      </div>

      {/* Row 2: Prediction Distribution & At-Risk Snapshot */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          alignItems: "flex-start",
        }}
      >
        {/* Prediction Distribution */}
        <div style={{ flex: 1 }}>
          <h3>Prediction Distribution</h3>
          {predictionDistribution.status === "loading" && (
            <p>Loading chart...</p>
          )}
          {predictionDistribution.error && (
            <p>Error Chart: {predictionDistribution.error}</p>
          )}
          {predictionDistribution.status === "succeeded" &&
            predictionDistribution.data && (
              <PredictionDistributionChart data={predictionDistribution.data} />
            )}
        </div>

        {/* At-Risk Snapshot */}
        <div style={{ flex: 1.5 }}>
          <h3>At-Risk Students Snapshot</h3>
          {atRiskSnapshot.status === "loading" && <p>Loading students...</p>}
          {atRiskSnapshot.error && (
            <p>Error Students: {atRiskSnapshot.error}</p>
          )}
          {atRiskSnapshot.status === "succeeded" && atRiskSnapshot.data && (
            <AtRiskStudentsTable students={atRiskSnapshot.data} />
          )}
        </div>
      </div>

      {/* Row 3: Engagement Trends */}
      <h3>Engagement Trends</h3>
      {engagementTrends.status === "loading" && <p>Loading trends...</p>}
      {engagementTrends.error && <p>Error Trends: {engagementTrends.error}</p>}
      {engagementTrends.status === "succeeded" && engagementTrends.data && (
        <EngagementTrendChart data={engagementTrends.data} />
      )}
    </div>
  );
};

export default DashboardPage;
