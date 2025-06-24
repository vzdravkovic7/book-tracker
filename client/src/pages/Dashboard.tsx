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
    <div className="min-h-screen bg-gradient-to-b from-background-light to-background text-text-light px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white font-heading text-center">
          Your Book Library
        </h2>

        {books.length === 0 ? (
          <p className="text-center text-text-light text-sm">
            No books found. Start by adding one!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
