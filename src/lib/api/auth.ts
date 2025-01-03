import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api-v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Login failed");
      }
      throw error;
    }
  },

  register: async (userData: {
    email: string;
    password: string;
    role?: string;
  }) => {
    try {
      const { data } = await api.post("/auth/register", userData);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Registration failed");
      }
      throw error;
    }
  },
};
