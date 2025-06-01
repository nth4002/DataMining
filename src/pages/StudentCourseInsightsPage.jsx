// src/pages/StudentCourseInsightsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);
import {
  fetchStudentCoursePerformance,
  fetchUserProfile,
  fetchUserEnrollments,
} from "../features/studentDetail/studentDetailSlice";

const StudentCourseInsightsPage = () => {
  // console.log("ge here");
  const { userId, courseId } = useParams();
  const dispatch = useDispatch();
  const {
    data: insightsData,
    status: insightsStatus,
    error: insightsError,
  } = useSelector((state) => state.studentDetail.selectedCoursePerformance);

  // for displaying names
  const { data: userProfileData, status: profileStatus } = useSelector(
    (state) => state.studentDetail.profile
  );
  const { list: userEnrollments, status: enrollmentsStatus } = useSelector(
    (state) => state.studentDetail.enrollments
  );
  const currentEnrollmentDetails = userEnrollments.find(
    (e) => e.course_id === courseId && e.user_id === userId
  );
  // Effect for fetching student profile
  useEffect(() => {
    // console.log(`userId=${userId}   courseId=${courseId}   `);
    console.log(`userProfileData=${userProfileData}`);
    if (
      userId &&
      (!userProfileData ||
        userProfileData.user_id !== userId ||
        profileStatus == "idle")
    ) {
      // Fetch only if no profile, or profile is for a different user, or status is idle
      dispatch(fetchUserProfile(userId));
    }
  }, [userId, dispatch, userProfileData, profileStatus]);

  // Effect for fetching student enrollments
  useEffect(() => {
    if (
      userId &&
      (enrollmentsStatus === "idle" ||
        (userProfileData &&
          userProfileData.user_id === userId &&
          userEnrollments.length === 0))
    ) {
      // Fetch if status is idle, or if profile is loaded for this user but enrollments are empty
      // This second condition might need refinement based on how you expect enrollments to behave (e.g., always fetch if userId changes and current enrollments are not for this user)
      dispatch(fetchUserEnrollments(userId));
    }
  }, [
    userId,
    dispatch,
    enrollmentsStatus,
    userProfileData,
    userEnrollments.length,
  ]); // More specific dependencies

  // Effect for fetching course-specific insights
  useEffect(() => {
    if (userId && courseId) {
      // Fetch if status is idle, or if data is for a different course/user
      if (
        insightsStatus === "idle" ||
        (insightsData &&
          (insightsData.user_id !== userId ||
            insightsData.course_id !== courseId)) || // Assuming insightsData has user_id and course_id
        (!insightsData && insightsStatus !== "loading")
      ) {
        // Fetch if no data and not currently loading
        dispatch(fetchStudentCoursePerformance({ userId, courseId }));
      }
    }
  }, [userId, courseId, dispatch, insightsStatus, insightsData]); // Depends on ids and insight data/status
  if (insightsStatus === "loading" || insightsStatus === "idle") {
    return (
      <div className="p-4 text-center text-gray-600">Loading insights...</div>
    );
  }

  if (insightsError) {
    return (
      <div className="text-center py-4 space-y-4">
        <Link
          to={`/student/${userId}`} // Link back to the main student detail page
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to {userProfileData?.name || `User ${userId}`}'s Details
        </Link>
        <p className="text-red-500 bg-red-50 p-4 rounded-md">
          Error loading insights:{" "}
          {typeof insightsError === "string"
            ? insightsError
            : insightsError.message || "An unknown error occurred"}
        </p>
      </div>
    );
  }
  if (!insightsData) {
    return (
      <div className="text-center py-4 space-y-4">
        <Link
          to={`/student/${userId}`}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to {userProfileData?.name || `User ${userId}`}'s Details
        </Link>
        <p className="p-4 text-center text-gray-500">
          No insights data available for this student in this course.
        </p>
      </div>
    );
  }

  const weeklyScoresData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "After W4"], // Added "After W4"
    datasets: [
      {
        label: "Total Score",
        data: [
          insightsData.total_score_week1 || 0,
          insightsData.total_score_week2 || 0,
          insightsData.total_score_week3 || 0,
          insightsData.total_score_week4 || 0,
          insightsData.total_score_after_4weeks || 0, // Added
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const attemptsData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "After W4"],
    datasets: [
      {
        label: "Attempts Count",
        data: [
          insightsData.attempts_count_week1 || 0,
          insightsData.attempts_count_week2 || 0,
          insightsData.attempts_count_week3 || 0,
          insightsData.attempts_count_week4 || 0,
          insightsData.attempts_count_after_4weeks || 0,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const correctAnswersData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "After W4"],
    datasets: [
      {
        label: "Correct Answers",
        data: [
          insightsData.correct_answer_week1 || 0,
          insightsData.correct_answer_week2 || 0,
          insightsData.correct_answer_week3 || 0,
          insightsData.correct_answer_week4 || 0,
          insightsData.correct_answer_after_4weeks || 0,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const questionsDoneData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "After W4"],
    datasets: [
      {
        label: "Questions Done",
        data: [
          insightsData.questions_done_week1 || 0,
          insightsData.questions_done_week2 || 0,
          insightsData.questions_done_week3 || 0,
          insightsData.questions_done_week4 || 0,
          insightsData.questions_done_after_4weeks || 0,
        ],
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const watchingTimeData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "After W4"],
    datasets: [
      {
        label: "User Watch Time",
        data: [
          insightsData.user_watching_time_week1 || 0,
          insightsData.user_watching_time_week2 || 0,
          insightsData.user_watching_time_week3 || 0,
          insightsData.user_watching_time_week4 || 0,
          insightsData.user_watching_time_after_4weeks || 0,
        ],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="p-4 md:p-6 space-y-4">
      {/** Back to student detail button */}
      <Link
        to={`/student/${userId}`} // Link back to the main student detail page
        className="inline-flex items-center text-sm font-medium text-indigo-600
        hover:text-indigo-800 group mb-2"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
        Back to {userProfileData?.name || `User ${userId}`}'s Details
      </Link>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
        Course Engagement Insights:{" "}
        <span className="text-indigo-600">
          {userProfileData?.name || userId}
        </span>
        <span className="text-xl md:text-2xl text-gray-600">
          {" "}
          in {currentEnrollmentDetails?.course_name || courseId}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {" "}
        {/* Simplified to 2 columns for better chart display */}
        <div className="bg-white shadow-xl rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
            Total Score / Week
          </h3>
          <div className="h-64 md:h-80">
            <Bar
              data={weeklyScoresData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
            Attempts / Week
          </h3>
          <div className="h-64 md:h-80">
            <Bar
              data={attemptsData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
            Correct Answers / Week
          </h3>
          <div className="h-64 md:h-80">
            <Line
              data={correctAnswersData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
            Questions Done / Week
          </h3>
          <div className="h-64 md:h-80">
            <Bar
              data={questionsDoneData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-4 md:p-6 md:col-span-2">
          {" "}
          {/* Watch time chart spans 2 columns on md+ */}
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
            Watching Time / Week (min)
          </h3>
          <div className="h-64 md:h-80">
            <Line
              data={watchingTimeData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseInsightsPage;
