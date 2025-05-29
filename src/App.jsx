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

import VideoStatsPage from "./pages/VideoStatsPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import DataMiningPage from "./pages/DataMiningPage.jsx";
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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
