import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "../services/api";
import type { Book } from "../types";

const Dashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <div>
      <h2>Your Books</h2>
      {books.map((book) => (
        <BookCard key={book.id} book={book} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Dashboard;
