import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api-v1",
});

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  },

  register: async (userData: {
    email: string;
    password: string;
    role?: string;
  }) => {
    const { data } = await api.post("/auth/register", userData);
    return data;
  },
};
