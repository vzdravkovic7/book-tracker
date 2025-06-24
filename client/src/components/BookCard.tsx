import React from "react";
import type { Book } from "../types";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

interface Props {
  book: Book;
  onDelete: (id: string) => void;
}

const BookCard: React.FC<Props> = ({ book, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/books/${book.id}`);
      onDelete(book.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${book.id}`);
  };

  return (
    <div className="bg-background-light border border-gray-700 shadow-lg rounded-2xl p-5 space-y-3 text-text-light transition hover:shadow-xl">
      <h4 className="text-xl font-semibold text-white font-heading">
        {book.title}
      </h4>
      <p className="text-sm text-text-light">by {book.author}</p>
      <p className="text-sm text-text-light/80">Status: {book.status}</p>
      {book.rating && (
        <p className="text-sm text-text-light/80">Rating: {book.rating}/5</p>
      )}
      {book.review && (
        <p className="text-sm italic text-text-light/70">"{book.review}"</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          onClick={handleEdit}
          className="flex-1 py-2 text-sm bg-primary hover:bg-secondary text-white rounded-lg transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
