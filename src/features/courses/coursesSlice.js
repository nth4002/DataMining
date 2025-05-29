// src/features/courses/coursesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllCoursesAPI,
  fetchCourseByIdAPI,
  createCourseAPI,
  updateCourseAPI,
  deleteCourseAPI,
  fetchStudentsInCourseApi,
} from "../../services/coursesAPI";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllCoursesAPI();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchCourseDetail = createAsyncThunk(
  "courses/fetchCourseDetail",
  async (courseId, { rejectWithValue }) => {
    try {
      return await fetchCourseByIdAPI(courseId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      return await createCourseAPI(courseData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const editCourse = createAsyncThunk(
  "courses/editCourse",
  async ({ courseId, courseData }, { rejectWithValue }) => {
    try {
      return await updateCourseAPI(courseId, courseData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeCourse = createAsyncThunk(
  "courses/removeCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      await deleteCourseAPI(courseId); // delete often doesn't return the full object, just confirms
      return courseId; // Return the ID to remove from the list
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchCourseStudents = createAsyncThunk(
  "courses/fetchCourseStudents",
  async (courseId, { rejectWithValue }) => {
    try {
      return await fetchStudentsInCourseApi(courseId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
const initialState = {
  list: [], // list of courses
  selectedCourseId: null, // Keep this for the dashboard filter selection
  currentCourse: {
    data: null, // currentCourseId
    status: "idle",
    error: null,
  },
  status: "idle", // For the list of courses
  error: null,
  operationStatus: "idle", // No operation in progress (initial state).
  operationError: null,
  courseStudents: {
    list: [],
    status: "idle",
    error: null,
  },
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setSelectedCourseId: (state, action) => {
      state.selectedCourseId = action.payload;
      // Optionally, clear currentCourse when selection changes if not fetching immediately
      // state.currentCourse = { data: null, status: 'idle', error: null };
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = { data: null, status: "idle", error: null };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Courses
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Single Course Detail
      .addCase(fetchCourseDetail.pending, (state) => {
        state.currentCourse = { data: null, status: "loading", error: null };
      })
      .addCase(fetchCourseDetail.fulfilled, (state, action) => {
        state.currentCourse = {
          data: action.payload,
          status: "succeeded",
          error: null,
        };
      })
      .addCase(fetchCourseDetail.rejected, (state, action) => {
        state.currentCourse = {
          data: null,
          status: "failed",
          error: action.payload,
        };
      })

      // Add Course
      .addCase(addCourse.pending, (state) => {
        state.operationStatus = "loading";
        state.operationError = null;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.operationStatus = "succeeded";
        state.list.push(action.payload); // Add to the list
        // Optionally set as currentCourse if navigating to its detail page
        // state.currentCourse = { data: action.payload, status: 'succeeded', error: null };
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.operationStatus = "failed";
        state.operationError = action.payload;
      })

      // Edit Course
      .addCase(editCourse.pending, (state) => {
        state.operationStatus = "loading";
        state.operationError = null;
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        state.operationStatus = "succeeded";
        const index = state.list.findIndex(
          (c) => c.course_id === action.payload.course_id
        );
        if (index !== -1)
          state.list[index] = { ...state.list[index], ...action.payload }; // Update in list
        if (state.currentCourse.data?.course_id === action.payload.course_id) {
          // Update current if it's the one being edited
          state.currentCourse.data = action.payload;
        }
      })
      .addCase(editCourse.rejected, (state, action) => {
        state.operationStatus = "failed";
        state.operationError = action.payload;
      })

      // Remove Course
      .addCase(removeCourse.pending, (state) => {
        state.operationStatus = "loading";
        state.operationError = null;
      })
      .addCase(removeCourse.fulfilled, (state, action) => {
        // action.payload is courseId
        state.operationStatus = "succeeded";
        state.list = state.list.filter((c) => c.course_id !== action.payload);
        if (state.currentCourse.data?.course_id === action.payload) {
          state.currentCourse = { data: null, status: "idle", error: null }; // Clear if deleted
        }
        if (state.selectedCourseId === action.payload) {
          state.selectedCourseId = null; // Clear selection if deleted
        }
      })
      .addCase(removeCourse.rejected, (state, action) => {
        state.operationStatus = "failed";
        state.operationError = action.payload;
      })

      // fetch Students in the course
      .addCase(fetchCourseStudents.pending, (state) => {
        state.courseStudents = { list: [], status: "loading", error: null };
      })
      .addCase(fetchCourseStudents.fulfilled, (state, action) => {
        state.courseStudents = {
          list: action.payload,
          status: "succeeded",
          error: null,
        };
      })
      .addCase(fetchCourseStudents.rejected, (state, action) => {
        state.courseStudents = {
          list: [],
          status: "failed",
          error: action.payload,
        };
      });
  },
});

export const { setSelectedCourseId, clearCurrentCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
