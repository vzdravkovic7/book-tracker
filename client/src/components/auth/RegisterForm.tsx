import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

import TextInput from "../common/TextInput";
import PasswordInput from "../common/PasswordInput";
import FormError from "../common/FormError";
import LoadingButton from "../common/LoadingButton";

const RegisterForm: React.FC = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "password" || name === "confirmPassword") {
        setPasswordMismatch(updated.password !== updated.confirmPassword);
      }

      return updated;
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
      setLoading(true);
      await authService.register({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      navigate("/login");
    } catch {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-backgroundLight to-background dark:from-background dark:to-backgroundLight flex items-center justify-center px-4 transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-backgroundLight dark:bg-background text-textDark dark:text-textLight p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 space-y-6 transition-colors duration-300"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-textDark dark:text-textLight tracking-tight font-heading">
          Create Account
        </h2>

        <FormError message={error} />

        <TextInput
          name="username"
          label="Username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />

        <TextInput
          name="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />

        <PasswordInput
          name="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          placeholder="********"
          required
        />

        <PasswordInput
          name="confirmPassword"
          label="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="********"
          required
          showError={passwordMismatch}
        />

        <LoadingButton loading={loading} text="Register" />

        <p className="text-center text-sm mt-4 text-textDark dark:text-textLight transition-colors duration-300">
          Already have an account?{" "}
          <a href="/login" className="text-textAccept hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
