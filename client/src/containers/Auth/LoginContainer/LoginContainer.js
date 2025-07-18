"use client"

import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const { login, authLoading, authError } = useAuth();

  const router = useRouter();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSuccess(false);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    const result = await login(email, password);
    if (result.success) {
      setSuccess(true);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        router.push('/')
      }, 1000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {authError && (
          <div className="mb-4 text-red-600 text-center text-sm">{authError}</div>
        )}
        {success && (
          <div className="mb-4 text-green-600 text-center text-sm">Login successful!</div>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : ""
            }`}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold disabled:opacity-60"
          disabled={authLoading}
        >
          {authLoading ? "Logging in..." : "Login"}
        </button>
        <div className="my-3 pt-1 text-sm">
            {"Don't have an account?"} <Link className="text-blue-500" href={'/register'}> Click here to register</Link>
        </div>
      </form>

    </div>
  );
};

export default LoginContainer;