/**
 * A slice file defines:

The initial state for a specific feature (e.g. dashboard, user, courses).

The reducers that modify that part of the state.

The actions associated with those reducers.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDashboardKpisAPI,
  fetchPredictionDistributionAPI,
  fetchAtRiskSnapshotAPI,
  fetchEngagementTrendsAPI,
} from "../../services/dashboardAPI.js";
import { fetchCourseVideoStatsAPI } from "../../services/coursesAPI.js";

// async thunks
// pass a custom error message to rejectWithValue
export const fetchDashboardKpis = createAsyncThunk(
  "dashboard/fetchKpis", // base action type
  async (params, { rejectWithValue }) => {
    // A payload creator function that contains the async logic.
    try {
      return await fetchDashboardKpisAPI(params);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchPredictionDistribution = createAsyncThunk(
  "dashboard/fetchPredictionDistribution",
  async (params, { rejectWithValue }) => {
    try {
      return await fetchPredictionDistributionAPI(params);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchAtRiskSnapshot = createAsyncThunk(
  "dashboard/fetchAtRiskSnapshot",
  async (params, { rejectWithValue }) => {
    try {
      return await fetchAtRiskSnapshotAPI(params);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchEngagementTrends = createAsyncThunk(
  "dashboard/fetchEngagementTrends",
  async (params, { rejectWithValue }) => {
    try {
      return await fetchEngagementTrendsAPI(params);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchCourseVideoStats = createAsyncThunk(
  "dashboard/fetchCourseVideoStats",
  async ({ courseId, school }, { rejectWithValue }) => {
    try {
      return await fetchCourseVideoStatsAPI(courseId, school);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  kpis: { data: null, status: "idle", error: null },
  predictionDistribution: { data: null, status: "idle", error: null },
  atRiskSnapshot: { data: null, status: "idle", error: null },
  engagementTrends: { data: null, status: "idle", error: null },
  selectedSchool: null,
  courseVideoStats: { data: null, status: "idle", error: null },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSelectedSchool: (state, action) => {
      state.selectedSchool = action.payload;
    },
  },
  extraReducers: (builder) => {
    // KPI Reducers
    builder
      .addCase(fetchDashboardKpis.pending, (state) => {
        state.kpis = { ...state.kpis, status: "loading" };
      })
      .addCase(fetchDashboardKpis.fulfilled, (state, action) => {
        state.kpis = { data: action.payload, status: "succeeded", error: null };
      })
      .addCase(fetchDashboardKpis.rejected, (state, action) => {
        state.kpis = { ...state.kpis, status: "failed", error: action.payload };
      })

      // Prediction Distribution Reducers
      .addCase(fetchPredictionDistribution.pending, (state) => {
        state.predictionDistribution = {
          ...state.predictionDistribution,
          status: "loading",
        };
      })
      .addCase(fetchPredictionDistribution.fulfilled, (state, action) => {
        state.predictionDistribution = {
          data: action.payload,
          status: "succeeded",
          error: null,
        };
      })
      .addCase(fetchPredictionDistribution.rejected, (state, action) => {
        state.predictionDistribution = {
          ...state.predictionDistribution,
          status: "failed",
          error: action.payload,
        };
      })

      // At Risk Snapshot Reducers
      .addCase(fetchAtRiskSnapshot.pending, (state) => {
        state.atRiskSnapshot = { ...state.atRiskSnapshot, status: "loading" };
      })
      .addCase(fetchAtRiskSnapshot.fulfilled, (state, action) => {
        state.atRiskSnapshot = {
          data: action.payload,
          status: "succeeded",
          error: null,
        };
      })
      .addCase(fetchAtRiskSnapshot.rejected, (state, action) => {
        state.atRiskSnapshot = {
          ...state.atRiskSnapshot,
          status: "failed",
          error: action.payload,
        };
      })

      // Engagement Trends Reducers
      .addCase(fetchEngagementTrends.pending, (state) => {
        state.engagementTrends = {
          ...state.engagementTrends,
          status: "loading",
        };
      })
      .addCase(fetchEngagementTrends.fulfilled, (state, action) => {
        state.engagementTrends = {
          data: action.payload,
          status: "succeeded",
          error: null,
        };
      })
      .addCase(fetchEngagementTrends.rejected, (state, action) => {
        state.engagementTrends = {
          ...state.engagementTrends,
          status: "failed",
          error: action.payload,
        };
      })
      // fetch course video stats
      .addCase(fetchCourseVideoStats.pending, (state) => {
        state.courseVideoStats = { data: null, status: "loading", error: null };
      })
      .addCase(fetchCourseVideoStats.fulfilled, (state, action) => {
        state.courseVideoStats = {
          data: action.payload,
          status: "succeeded",
          error: null,
        };
      })
      .addCase(fetchCourseVideoStats.rejected, (state, action) => {
        state.courseVideoStats = {
          data: null,
          status: "failed",
          error: action.payload,
        };
      });
  },
});

export const { setSelectedSchool } = dashboardSlice.actions;
export default dashboardSlice.reducer;
