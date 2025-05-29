// src/services/userAPI.js
import apiClient from "./apiClient";

export const fetchUserProfileAPI = async (userId) => {
  const response = await apiClient.get(`/users/${userId}/profile`);
  return response.data;
};

export const fetchUserEnrollmentsAPI = async (userId) => {
  const response = await apiClient.get(`/users/${userId}/enrollments`);
  return response.data;
};

export const fetchStudentCoursePerformanceAPI = async (userId, courseId) => {
  const response = await apiClient.get(
    `/users/${userId}/performance/${courseId}`
  );
  return response.data;
};
