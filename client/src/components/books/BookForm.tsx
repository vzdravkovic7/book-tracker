import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../services/api";
import type { Book } from "../../types";

import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import TextArea from "../common/TextArea";
import LoadingButton from "../common/LoadingButton";

const BookForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Book, "id">>({
    title: "",
    author: "",
    status: "Reading",
    rating: undefined,
    review: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`/books/${id}`).then((res) => setForm(res.data));
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
    try {
      setLoading(true);
      if (id) {
        await axios.put(`/books/${id}`, form);
      } else {
        await axios.post("/books", form);
      }
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

        <TextInput
          name="title"
          label="Title"
          value={form.title}
          onChange={handleChange}
          placeholder="Book Title"
          required
        />

        <TextInput
          name="author"
          label="Author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author Name"
          required
        />

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

        <TextInput
          name="rating"
          label="Rating (1–5)"
          type="number"
          value={form.rating || ""}
          onChange={handleChange}
          placeholder="Optional"
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
