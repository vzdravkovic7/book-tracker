import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { isPhoneValid, isPasswordConfirmed } from "../../utils/formValidators";
import { baseUserFields, passwordFields } from "../../config/formFieldConfigs";

import FormError from "../common/FormError";
import LoadingButton from "../common/LoadingButton";
import ProfileImageUpload from "../common/ProfileImageUpload";
import FormFields, { type FormField } from "../common/FormFields";

import type { RegisterDTO } from "../../types";
import { useImagePreview } from "../../hooks/useImagePreview";
import { getFileFromInputEvent } from "../../utils/imageUtils";
import { useFormState } from "../../hooks/useFormState";

const RegisterForm: React.FC = () => {
  const { form, handleChange } = useFormState<RegisterDTO>({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    username: "",
    email: "",
    password: "",
    profileImageUrl: undefined,
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { preview, selectedFile, handleImageChange } = useImagePreview();

  const onImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = getFileFromInputEvent(e);
    handleImageChange(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isPhoneValid(form.phoneNumber)) {
      setError("Invalid phone number format.");
      return;
    }

    if (!isPasswordConfirmed(form.password, confirmPassword)) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      await authService.registerFormData(formData);
      navigate("/login");
    } catch {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields: FormField[] = [
    ...baseUserFields(form, handleChange),
    ...passwordFields(
      form.password,
      confirmPassword,
      setConfirmPassword,
      handleChange
    ),
  ];

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

        <ProfileImageUpload
          previewUrl={preview}
          onFileChange={onImageInputChange}
          label="Upload Profile Image"
        />

        <FormFields fields={fields} />

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
