// src/services/coursesAPI.js
import apiClient from "./apiClient";

export const fetchAllCoursesAPI = async () => {
  const response = await apiClient.get("/courses");
  return response.data; // Now returns [{ course_id: 'CS101', name: 'Intro to CS', field: 'CS' }, ...]
};

export const fetchCourseByIdAPI = async (courseId) => {
  const response = await apiClient.get(`/courses/${courseId}`);
  return response.data; // Returns full course object
};

export const createCourseAPI = async (courseData) => {
  const response = await apiClient.post("/courses", courseData);
  return response.data;
};

export const updateCourseAPI = async (courseId, courseData) => {
  const response = await apiClient.put(`/courses/${courseId}`, courseData);
  return response.data;
};

export const deleteCourseAPI = async (courseId) => {
  const response = await apiClient.delete(`/courses/${courseId}`);
  return response.data;
};
