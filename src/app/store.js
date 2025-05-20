import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../features/courses/coursesSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    dashboard: dashboardReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Optional
});
