import React from "react";

interface Props {
  previewUrl: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const ProfileImageUpload: React.FC<Props> = ({
  previewUrl,
  onFileChange,
  label,
}) => (
  <div className="flex flex-col items-center gap-2">
    <img
      src={previewUrl || "/Images/profile/default.jpg"}
      alt="Preview"
      className="w-28 h-28 rounded-full object-cover border"
    />
    <label className="text-sm font-medium mt-2 text-center">
      <span className="block mb-1">{label || "Upload Profile Image"}</span>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg
          file:border-0
          file:text-sm file:font-semibold
          file:bg-primary file:text-white
          hover:file:bg-secondary
          dark:file:bg-blue-400 dark:hover:file:bg-blue-600 dark:file:text-gray-900
          transition-all duration-300 cursor-pointer"
      />
    </label>
  </div>
);

export default ProfileImageUpload;
