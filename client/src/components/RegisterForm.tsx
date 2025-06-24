import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const RegisterForm: React.FC = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };

      if (name === "password" || name === "confirmPassword") {
        setPasswordMismatch(
          updatedForm.password !== updatedForm.confirmPassword
        );
      }

      return updatedForm;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setPasswordMismatch(true);
      setError("Passwords do not match.");
      return;
    }

    try {
      await authService.register({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      navigate("/login");
    } catch {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background-light to-background flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-background-light text-text-light p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-700 space-y-6"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white tracking-tight font-heading">
          Create Account
        </h2>

        {error && (
          <p className="text-text-alert text-sm text-center border border-red-500 bg-red-500/10 py-2 px-3 rounded">
            {error}
          </p>
        )}

        <div>
          <label className="block mb-2 text-sm font-medium text-text-light">
            Username
          </label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-text-light">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-text-light">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg placeholder-gray-500 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-primary transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              tabIndex={-1}
            >
              {showPassword ? (
                // Eye Open
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                // Eye Off
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 011.828-5.757m4.157-2.054A9.959 9.959 0 0112 3c5.523 0 10 4.477 10 10 0 1.043-.158 2.047-.452 2.99M3 3l18 18"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-text-light">
            Confirm Password
          </label>
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className={`w-full px-4 py-3 bg-background border ${
                passwordMismatch ? "border-red-500" : "border-gray-700"
              } rounded-lg placeholder-gray-500 text-sm pr-10 focus:outline-none focus:ring-2 ${
                passwordMismatch ? "focus:ring-red-500" : "focus:ring-primary"
              } transition`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                // Eye Open
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                // Eye Off
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 011.828-5.757m4.157-2.054A9.959 9.959 0 0112 3c5.523 0 10 4.477 10 10 0 1.043-.158 2.047-.452 2.99M3 3l18 18"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary hover:bg-secondary active:bg-blue-900 rounded-lg text-white font-semibold text-sm tracking-wide transition-all shadow-md hover:shadow-lg"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4 text-text-light">
          Already have an account?{" "}
          <a href="/login" className="text-text-accept hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
