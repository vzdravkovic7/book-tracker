import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import userService from "../../services/userService";

import TextInput from "../common/TextInput";
import PasswordInput from "../common/PasswordInput";
import FormError from "../common/FormError";
import LoadingButton from "../common/LoadingButton";

const RegisterForm: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
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

  const handleImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setProfileImageFile(file);
    handleImagePreview(file);
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

      let profileImageUrl: string | undefined = undefined;

      if (profileImageFile) {
        profileImageUrl = await userService.uploadProfileImage(
          profileImageFile,
          true
        );
      }

      await authService.register({
        ...form,
        profileImageUrl,
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
        <h2 className="text-3xl sm:text-4xl font-bold text-center font-heading">
          Create Account
        </h2>

        <FormError message={error} />

        <div className="flex flex-col items-center gap-2">
          <img
            src={previewImage || "/Images/profile/default.jpg"}
            alt="Preview"
            className="w-28 h-28 rounded-full object-cover border"
          />
          <label className="text-sm font-medium mt-2">
            <span className="block text-center mb-1">Upload Profile Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:border-0
                 file:text-sm file:font-semibold
                 file:bg-primary file:text-white
                 hover:file:bg-secondary
                 transition-colors duration-300 cursor-pointer"
            />
          </label>
        </div>

        <TextInput
          name="firstName"
          label="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <TextInput
          name="lastName"
          label="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <TextInput
          name="address"
          label="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <TextInput
          name="phoneNumber"
          label="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />
        <TextInput
          name="username"
          label="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <TextInput
          name="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <PasswordInput
          name="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <PasswordInput
          name="confirmPassword"
          label="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          showError={passwordMismatch}
        />

        <LoadingButton loading={loading} text="Register" />

        <p className="text-center text-sm mt-4">
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
