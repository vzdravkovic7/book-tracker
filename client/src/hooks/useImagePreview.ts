import { useState } from "react";

export const useImagePreview = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setPreview(null);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return {
    preview,
    selectedFile,
    setSelectedFile,
    setPreview,
    handleImageChange,
  };
};
