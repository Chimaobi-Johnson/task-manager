"use client"

import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Register function
  const register = async (email, password) => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const result = await axios.post("/api/auth/register", { email, password });
      setUser(result.data.user || null);
      return { success: true, data: result.data };
    } catch (err) {
      setAuthError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      return { success: false, error: err.response?.data?.message || "Registration failed. Please try again." };
    } finally {
      setAuthLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const result = await axios.post("/api/auth/login", { email, password });
      setUser(result.data.user || null);
      return { success: true, data: result.data };
    } catch (err) {
      setAuthError(
        err.response?.data?.message || "Login failed. Please try again."
      );
      return { success: false, error: err.response?.data?.message || "Login failed. Please try again." };
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, authError, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
