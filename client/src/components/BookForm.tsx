import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../services/api";
import type { Book } from "../types";

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
    <div className="min-h-screen bg-gradient-to-b from-background-light to-background flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-background-light text-text-light p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-700 space-y-6"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center tracking-tight font-heading text-white">
          {id ? "Edit Book" : "Add a New Book"}
        </h2>

        <div>
          <label className="block mb-2 text-sm font-medium text-text-light">
            Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Book Title"
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-text-light">
            Author
          </label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author Name"
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-text-light">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
          >
            <option value="Reading">Reading</option>
            <option value="Completed">Completed</option>
            <option value="Wishlist">Wishlist</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-text-light">
            Rating (1–5)
          </label>
          <input
            name="rating"
            type="number"
            min="1"
            max="5"
            value={form.rating || ""}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-text-light">
            Review
          </label>
          <textarea
            name="review"
            value={form.review || ""}
            onChange={handleChange}
            placeholder="Write your thoughts..."
            className="w-full px-4 py-3 bg-background border border-gray-700 rounded-lg placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary hover:bg-secondary active:bg-blue-900 rounded-lg text-white font-semibold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center"
          disabled={loading}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              />
            </svg>
          )}
          {loading ? "Saving..." : id ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
