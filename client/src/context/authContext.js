"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import instance from "@/lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const router = useRouter();

  // Redirect to /login if not logged in
  useEffect(() => {
    if (typeof window !== "undefined" && !user && !authLoading) {
      router.push("/login");
    }
  }, [user, authLoading]);

  // Register function
  const register = async (email, password) => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const result = await instance.post("/api/auth/register", { email, password });
      setUser(result.data.user || null);
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
      }
      return { success: true, data: result.data };
    } catch (err) {
      setAuthError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
      return { success: false, error: err.response?.data?.error || err.response?.data?.message || "Registration failed. Please try again." };
    } finally {
      setAuthLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const result = await instance.post("/api/auth/login", { email, password });
      setUser(result.data.user || null);
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
      }
      return { success: true, data: result.data };
    } catch (err) {
      setAuthError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Login failed. Please try again."
      );
      return { success: false, error: err.response?.data?.error || err.response?.data?.message || "Login failed. Please try again." };
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await instance.post("/api/auth/logout"); // Optional: inform backend
    } catch (e) {}
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, authError, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
