import apiClient from "./apiClient";

export const fetchDashboardKpisAPI = async (params) => {
  const response = await apiClient.get("/dashboard/kpis", { params });
  return response.data;
};

export const fetchPredictionDistributionAPI = async (params) => {
  const response = await apiClient.get("/dashboard/prediction-distribution", {
    params,
  });
  return response.data;
};

export const fetchAtRiskSnapshotAPI = async (params) => {
  const response = await apiClient.get("/dashboard/at-risk-snapshot", {
    params,
  });
  return response.data;
};

export const fetchEngagementTrendsAPI = async (params) => {
  const response = await apiClient.get("/dashboard/engagement-trends", {
    params,
  });
  return response.data;
};
