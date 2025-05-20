// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.jsx"; // Make sure .jsx extension is used if needed
// import StudentDetailPage from './pages/StudentDetailPage.jsx'; // Future: Uncomment when ready
// import Navbar from './components/layout/Navbar.jsx'; // Optional: Uncomment if you have a Navbar

// Optional: A simple global styles import if you have one (or use index.css)
// import './App.css';

function App() {
  return (
    <Router>
      {/* <Navbar /> */} {/* Optional: Your navigation bar */}
      <div
        className="container"
        style={{ padding: "20px", margin: "0 auto", maxWidth: "1200px" }}
      >
        <Routes>
          {/* Define your route for the dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Future route for student detail page */}
          {/* <Route path="/student/:studentId" element={<StudentDetailPage />} /> */}

          {/* Default route: Redirect any other unmatched path to /dashboard */}
          <Route path="/" element={<Navigate replace to="/dashboard" />} />

          {/* You can add a 404 Not Found page later */}
          {/* <Route path="*" element={<div><h2>404 Not Found</h2></div>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
