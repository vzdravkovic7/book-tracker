import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FormError from "../components/common/FormError";
import LoadingButton from "../components/common/LoadingButton";
import ProfileImageUpload from "../components/common/ProfileImageUpload";
import FormFields, { type FormField } from "../components/common/FormFields";

import userService from "../services/userService";
import type { EditUserDTO, User } from "../types";
import { useImagePreview } from "../hooks/useImagePreview";
import { getFileFromInputEvent } from "../utils/imageUtils";
import { isPhoneValid, isPasswordConfirmed } from "../utils/formValidators";
import { baseUserFields } from "../config/formFieldConfigs";

const EditProfile: React.FC = () => {
  const [form, setForm] = useState<EditUserDTO | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    preview: previewImage,
    selectedFile,
    handleImageChange,
  } = useImagePreview();

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = getFileFromInputEvent(e);
    handleImageChange(file);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    if (!isPhoneValid(form.phoneNumber)) {
      setError("Invalid phone number format.");
      return;
    }

    if (newPassword && !isPasswordConfirmed(newPassword, confirmPassword)) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("username", form.username);
      formData.append("address", form.address);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("email", form.email);
      if (newPassword.trim()) {
        formData.append("newPassword", newPassword);
      }
      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      await userService.updateProfileFormData(formData);
      navigate("/profile");
    } catch {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <p className="p-6 text-center">Loading form...</p>;

  const fields: FormField[] = [
    ...baseUserFields(form, handleChange, { disableEmail: true }),
    {
      name: "newPassword",
      type: "password",
      label: "New Password (optional)",
      value: newPassword,
      onChange: (e) => setNewPassword(e.target.value),
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm New Password",
      value: confirmPassword,
      onChange: (e) => setConfirmPassword(e.target.value),
      showError: !!newPassword && newPassword !== confirmPassword,
    },
  ];

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

        <ProfileImageUpload
          previewUrl={
            previewImage ||
            `http://localhost:5209${
              form.profileImageUrl ?? "/Images/profile/default.jpg"
            }`
          }
          onFileChange={handleFileInput}
          label="Change Profile Image"
        />

        <FormFields fields={fields} />

        <div className="pt-4">
          <LoadingButton loading={saving} text="Save Changes" />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
