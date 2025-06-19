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
    // userId not needed in frontend — set by backend from JWT
  });

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
      if (id) {
        await axios.put(`/books/${id}`, form);
      } else {
        await axios.post("/books", form);
      }
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Edit Book" : "Add Book"}</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Author"
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="Reading">Reading</option>
        <option value="Completed">Completed</option>
        <option value="Wishlist">Wishlist</option>
      </select>
      <input
        name="rating"
        type="number"
        min="1"
        max="5"
        value={form.rating || ""}
        onChange={handleChange}
        placeholder="Rating (1–5)"
      />
      <textarea
        name="review"
        value={form.review || ""}
        onChange={handleChange}
        placeholder="Review"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default BookForm;
