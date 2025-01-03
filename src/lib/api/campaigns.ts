import axios from "axios";
import { Campaign } from "@/types";

import { getAuthToken } from "../auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api-v1",
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const campaignApi = {
  // Get all campaigns with optional search parameters
  getAll: async (params?: {
    title?: string;
    landingPageUrl?: string;
    isRunning?: boolean;
  }) => {
    const { data } = await api.get<Campaign[]>("/campaigns", { params });
    return data;
  },

  // Get a single campaign by ID
  getById: async (id: number) => {
    const { data } = await api.get<Campaign>(`/campaigns/${id}`);
    return data;
  },

  // Create a new campaign
  create: async (
    campaign: Omit<Campaign, "id" | "createdAt" | "updatedAt">
  ) => {
    const { data } = await api.post<Campaign>("/campaigns", campaign);
    return data;
  },

  // Update an existing campaign
  update: async (id: number, campaign: Partial<Campaign>) => {
    const { data } = await api.patch<Campaign>(`/campaigns/${id}`, campaign);
    return data;
  },

  // Toggle campaign status
  toggleStatus: async (id: number) => {
    const { data } = await api.patch<Campaign>(`/campaigns/${id}/toggle`);
    return data;
  },

  getStats: async () => {
    const { data } = await api.get<Campaign>("/campaigns/stats");

    return data;
  },
};
