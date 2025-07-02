import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../services/api";
import { getFileFromInputEvent } from "../../utils/imageUtils";
import { useImagePreview } from "../../hooks/useImagePreview";
import {
  baseBookFields,
  dateCompletedField,
} from "../../config/formFieldConfigs";
import { validateBookForm } from "../../utils/bookFormValidation";

import FormError from "../common/FormError";
import LoadingButton from "../common/LoadingButton";
import BookCoverUpload from "../common/BookCoverUpload";
import FormFields from "../common/FormFields";
import SelectInput from "../common/SelectInput";
import TextArea from "../common/TextArea";

import type { Book } from "../../types";

const BookForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Book, "id">>({
    title: "",
    author: "",
    genre: "",
    status: "Reading",
    rating: undefined,
    review: "",
    dateCompleted: "",
    coverImageUrl: undefined,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    preview: previewCover,
    selectedFile,
    handleImageChange,
  } = useImagePreview();

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = getFileFromInputEvent(e);
    handleImageChange(file);
  };

  useEffect(() => {
    if (id) {
      axios.get(`/books/${id}`).then((res) => {
        const book = res.data;
        const dateCompletedISO = book.dateCompleted;
        book.dateCompleted = dateCompletedISO
          ? dateCompletedISO.split("T")[0]
          : "";
        setForm(book);
      });
    } else {
      setForm({
        title: "",
        author: "",
        genre: "",
        status: "Reading",
        rating: undefined,
        review: "",
        dateCompleted: "",
        coverImageUrl: undefined,
      });
      handleImageChange(null);
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const validationError = validateBookForm(form);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    const formattedForm = { ...form };

    if (form.dateCompleted && form.status === "Completed") {
      const date = new Date(form.dateCompleted + "T12:00:00Z");
      formattedForm.dateCompleted = date.toISOString();
    } else {
      formattedForm.dateCompleted = "";
    }

    try {
      const formData = new FormData();
      Object.entries(formattedForm).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (typeof value === "number") {
            formData.append(key, value.toString());
          } else {
            formData.append(key, value);
          }
        }
      });
      if (selectedFile) {
        formData.append("coverImage", selectedFile);
      }

      if (id) {
        await axios.put(`/books/${id}`, formData);
      } else {
        await axios.post("/books", formData);
      }
      navigate("/dashboard");
    } catch {
      setError("Failed to save book.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    ...baseBookFields(form, handleChange),
    ...(form.status === "Completed"
      ? [dateCompletedField(form, handleChange)]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-backgroundLight to-background dark:from-background dark:to-backgroundLight flex items-center justify-center px-4 transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl bg-backgroundLight dark:bg-background text-textDark dark:text-textLight p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 space-y-6 transition-colors duration-300"
      >
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
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

        <h2 className="text-3xl sm:text-4xl font-bold text-center tracking-tight font-heading text-textDark dark:text-textLight">
          {id ? "Edit Book" : "Add a New Book"}
        </h2>

        <FormError message={error} />

        <BookCoverUpload
          previewUrl={
            previewCover ||
            `http://localhost:5209${
              form.coverImageUrl ?? "/Images/books/default.jpg"
            }`
          }
          onFileChange={handleFileInput}
          label="Upload Book Cover"
        />

        <FormFields fields={fields} />

        <SelectInput
          name="status"
          label="Status"
          value={form.status}
          onChange={handleChange}
          options={[
            { value: "Reading", label: "Reading" },
            { value: "Completed", label: "Completed" },
            { value: "Wishlist", label: "Wishlist" },
          ]}
        />

        <TextArea
          name="review"
          label="Review"
          value={form.review || ""}
          onChange={handleChange}
          placeholder="Write your thoughts..."
        />

        <LoadingButton
          loading={loading}
          text={id ? "Update Book" : "Add Book"}
        />
      </form>
    </div>
  );
};

export default BookForm;
