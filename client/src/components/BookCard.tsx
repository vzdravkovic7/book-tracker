import React from "react";
import type { Book } from "../types";
import axios from "../services/api";

interface Props {
  book: Book;
  onDelete: (id: string) => void;
}

const BookCard: React.FC<Props> = ({ book, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/books/${book.id}`);
      onDelete(book.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>{book.title}</h4>
      <p>{book.author}</p>
      <p>Status: {book.status}</p>
      {book.rating && <p>Rating: {book.rating}/5</p>}
      {book.review && <p>Review: {book.review}</p>}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default BookCard;
