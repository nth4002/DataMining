// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import StudentListPage from "./pages/StudentListPage";
import CourseEngagementPage from "./pages/CourseEngagementPage";

// Imprt Pages
import VideoStatsPage from "./pages/VideoStatsPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import DataMiningPage from "./pages/DataMiningPage";
import StudentCourseInsightsPage from "./pages/StudentCourseInsightsPage";
import ModelPage from "./pages/ModelPage.jsx";
// Import new EDA Page components
import EdaCoursePage from "./pages/eda/EdaCoursePage";
import EdaUserVideoPage from "./pages/eda/EdaUserVideoPage";
import EdaUserProblemPage from "./pages/eda/EdaUserProblemPage";
import EdaProblemPage from "./pages/eda/EdaProblemPage";
import EdaExerciseProblemPage from "./pages/eda/EdaExerciseProblemPage";
import EdaUserPage from "./pages/eda/EdaUserPage";
// import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar /> {/* navigation bar  */}
        <main className="flex-grow w-full bg-gray-200 p-4 md:p-6 lg:p-8">
          {" "}
          {/* Added w-full and a temporary background color */}
          <Routes>
            {/* Define your route for the dashboard */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/data-mining-process" element={<DataMiningPage />} />
            {/* EDA Detail Routes */}
            <Route
              path="/data-mining-process/eda/users"
              element={<EdaUserPage />}
            />
            <Route
              path="/data-mining-process/eda/course"
              element={<EdaCoursePage />}
            />
            <Route
              path="/data-mining-process/eda/user-video"
              element={<EdaUserVideoPage />}
            />
            <Route
              path="/data-mining-process/eda/user-problem"
              element={<EdaUserProblemPage />}
            />
            <Route
              path="/data-mining-process/eda/problem"
              element={<EdaProblemPage />}
            />
            <Route
              path="/data-mining-process/eda/exercise-problem"
              element={<EdaExerciseProblemPage />}
            />
            {/* Other existing routes */}
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route
              path="/courses/:courseId/students"
              element={<StudentListPage />}
            />
            <Route
              path="/courses/:courseId/engagement"
              element={<CourseEngagementPage />}
            />
            <Route
              path="/courses/:courseId/video-stats"
              element={<VideoStatsPage />}
            />{" "}
            {/* Renamed route */}
            <Route path="/student/:userId" element={<StudentDetailPage />} />
            <Route
              path="/student/:userId/course-insights/:courseId"
              element={<StudentCourseInsightsPage />}
            />
            <Route path="/model" element={<ModelPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
