// src/features/studentDetail/studentDetailSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserProfileAPI,
  fetchUserEnrollmentsAPI,
  fetchStudentCoursePerformanceAPI,
} from "../../services/userAPI"; // Ensure this path is correct

// Async Thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  "studentDetail/fetchUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await fetchUserProfileAPI(userId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch user profile"
      );
    }
  }
);

// Async Thunk for fetching user enrollments
export const fetchUserEnrollments = createAsyncThunk(
  "studentDetail/fetchUserEnrollments",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await fetchUserEnrollmentsAPI(userId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch user enrollments"
      );
    }
  }
);

// Async Thunk for fetching student's performance in a specific course
export const fetchStudentCoursePerformance = createAsyncThunk(
  "studentDetail/fetchStudentCoursePerformance",
  async ({ userId, courseId }, { rejectWithValue }) => {
    try {
      const data = await fetchStudentCoursePerformanceAPI(userId, courseId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch course performance"
      );
    }
  }
);

const initialState = {
  profile: { data: null, status: "idle", error: null }, // 'idle' | 'loading' | 'succeeded' | 'failed'
  enrollments: { list: [], status: "idle", error: null },
  selectedCoursePerformance: { data: null, status: "idle", error: null },
  selectedCourseForDetailView: null, // Stores the course_id selected on the student detail page
};

const studentDetailSlice = createSlice({
  name: "studentDetail",
  initialState,
  reducers: {
    // Action to set the currently selected course for viewing detailed performance
    selectCourseForDetailView: (state, action) => {
      state.selectedCourseForDetailView = action.payload; // payload should be course_id or null
      // Reset performance data when a new course is selected or deselected
      state.selectedCoursePerformance = {
        data: null,
        status: "idle",
        error: null,
      };
    },
    // Action to clear all student detail data (e.g., when navigating away from the page)
    clearStudentDetail: (state) => {
      state.profile = { data: null, status: "idle", error: null };
      state.enrollments = { list: [], status: "idle", error: null };
      state.selectedCoursePerformance = {
        data: null,
        status: "idle",
        error: null,
      };
      state.selectedCourseForDetailView = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Cases for fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.profile.status = "loading";
        state.profile.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile.status = "succeeded";
        state.profile.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.profile.status = "failed";
        state.profile.error = action.payload;
      })

      // Cases for fetchUserEnrollments
      .addCase(fetchUserEnrollments.pending, (state) => {
        state.enrollments.status = "loading";
        state.enrollments.error = null;
      })
      .addCase(fetchUserEnrollments.fulfilled, (state, action) => {
        state.enrollments.status = "succeeded";
        state.enrollments.list = action.payload;
      })
      .addCase(fetchUserEnrollments.rejected, (state, action) => {
        state.enrollments.status = "failed";
        state.enrollments.error = action.payload;
      })

      // Cases for fetchStudentCoursePerformance
      .addCase(fetchStudentCoursePerformance.pending, (state) => {
        state.selectedCoursePerformance.status = "loading";
        state.selectedCoursePerformance.error = null;
      })
      .addCase(fetchStudentCoursePerformance.fulfilled, (state, action) => {
        state.selectedCoursePerformance.status = "succeeded";
        state.selectedCoursePerformance.data = action.payload;
      })
      .addCase(fetchStudentCoursePerformance.rejected, (state, action) => {
        state.selectedCoursePerformance.status = "failed";
        state.selectedCoursePerformance.error = action.payload;
      });
  },
});

export const { selectCourseForDetailView, clearStudentDetail } =
  studentDetailSlice.actions;
export default studentDetailSlice.reducer;
