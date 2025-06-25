import React, { useEffect, useState } from "react";
import BookCard from "../components/books/BookCard";
import axios from "../services/api";
import type { Book } from "../types";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  username: string;
}

const Dashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Extract Username from token
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      setUsername(decoded.username);
    }

    axios
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background text-textDark dark:text-textLight px-4 py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-textDark dark:text-textLight font-heading text-center">
          Hello{username ? `, ${username}` : ""}! 👋
        </h2>

        {books.length === 0 ? (
          <p className="text-center text-textDark dark:text-textLight text-sm">
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
