import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

import TextInput from "../common/TextInput";
import PasswordInput from "../common/PasswordInput";
import FormError from "../common/FormError";
import LoadingButton from "../common/LoadingButton";

const LoginForm: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await authService.login(form);
      navigate("/dashboard");
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError(err.response.data || "Unauthorized");
      } else {
        setError("Something went wrong.");
      }
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
          Welcome Back
        </h2>

        <FormError message={error} />

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

        <LoadingButton loading={loading} text="Sign In" />

        <p className="text-center text-sm mt-4 text-textDark dark:text-textLight transition-colors duration-300">
          Don’t have an account?{" "}
          <a href="/register" className="text-textAccept hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
