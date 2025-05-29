import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../features/courses/coursesSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import studentDetailReducer from "../features/studentDetail/studentDetailSlice";
export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    dashboard: dashboardReducer,
    studentDetail: studentDetailReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Optional
});
