import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService, {
  type EditUserDTO,
  type User,
} from "../services/userService";

import TextInput from "../components/common/TextInput";
import PasswordInput from "../components/common/PasswordInput";
import LoadingButton from "../components/common/LoadingButton";
import FormError from "../components/common/FormError";

const EditProfile: React.FC = () => {
  const [form, setForm] = useState<EditUserDTO | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userService.getMe().then((data: User) => {
      setForm({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        username: data.username,
        profileImageUrl: data.profileImageUrl,
        email: data.email,
      });
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePhone = (phone: string) => {
    return /^\+?[0-9\s\-]{7,15}$/.test(phone);
  };

  const handleImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    handleImagePreview(file);
    try {
      setUploading(true);
      const imageUrl = await userService.uploadProfileImage(file);
      setForm((prev) => (prev ? { ...prev, profileImageUrl: imageUrl } : prev));
    } catch {
      setError("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    if (!validatePhone(form.phoneNumber)) {
      setError("Invalid phone number format.");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSaving(true);
      await userService.updateProfile({
        ...form,
        newPassword: newPassword.trim() ? newPassword : undefined,
      });
      navigate("/profile");
    } catch {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <p className="p-6 text-center">Loading form...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-backgroundLight to-background dark:from-background dark:to-backgroundLight flex items-center justify-center px-4 transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-xl bg-backgroundLight dark:bg-background text-textDark dark:text-textLight p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 space-y-6 transition-colors duration-300"
      >
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="absolute top-4 right-4 text-gray-400 hover:text-textDark dark:hover:text-white transition"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-3xl sm:text-4xl font-bold text-center font-heading">
          Edit Profile
        </h2>

        <FormError message={error} />

        <div className="flex flex-col items-center gap-2">
          <img
            src={
              previewImage ||
              `http://localhost:5209${
                form.profileImageUrl ?? "/Images/profile/default.jpg"
              }`
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />
          <label className="text-sm font-medium mt-2">
            <span className="block text-center mb-1">Change Profile Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-primary file:text-white
                         hover:file:bg-secondary
                         transition-colors duration-300 cursor-pointer"
            />
          </label>
          {uploading && (
            <p className="text-sm text-gray-500 mt-1">Uploading...</p>
          )}
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
          name="username"
          label="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <TextInput
          name="phoneNumber"
          label="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="+381 64 1234567"
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
          name="email"
          label="Email"
          value={form.email}
          onChange={() => {}}
        />

        <PasswordInput
          name="newPassword"
          label="New Password (optional)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <PasswordInput
          name="confirmPassword"
          label="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="pt-4">
          <LoadingButton loading={saving} text="Save Changes" />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
