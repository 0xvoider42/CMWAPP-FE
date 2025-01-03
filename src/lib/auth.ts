import { jwtDecode } from "jwt-decode";

export interface User {
  id: number;
  email: string;
  role: string;
}

export interface AuthToken {
  sub: number;
  email: string;
  role: string;
  exp: number;
}

export const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const setAuthToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeAuthToken = () => {
  localStorage.removeItem("token");
};

export const decodeToken = (token: string): User | null => {
  try {
    const decoded = jwtDecode<AuthToken>(token);
    return {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    };
  } catch {
    return null;
  }
};

export const getCurrentUser = (): User | null => {
  const token = getAuthToken();
  if (!token) return null;
  return decodeToken(token);
};
