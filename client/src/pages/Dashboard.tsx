import React, { useEffect, useState } from "react";
import BookCard from "../components/books/BookCard";
import BookFilterControls from "../components/books/BookFilterControls";
import greetings from "../utils/greetings";
import { jwtDecode } from "jwt-decode";
import { useBookSearch } from "../hooks/useBookSearch";

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("Hello");

  const {
    books,
    filters,
    updateFilter,
    resetFilters,
    page,
    setPage,
    totalPages,
    genres,
    authors,
  } = useBookSearch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<{ username: string }>(token);
      setUsername(decoded.username);
    }

    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    setGreeting(randomGreeting);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-background text-textDark dark:text-textLight px-4 py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
          {greeting}
          {username ? `, ${username}` : ""}!
        </h2>

        <BookFilterControls
          filters={filters}
          onChange={updateFilter}
          onReset={resetFilters}
          genres={genres}
          authors={authors}
        />

        {books.length === 0 ? (
          <p className="text-center text-lg">No books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
