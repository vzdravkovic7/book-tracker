import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bookService from "../../services/bookService";
import type { Book } from "../../types";
import { useCarousel } from "../../hooks/useCarousel";

const FavoriteBooksCarousel: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();
  const { scrollRef, scroll, startAutoplay, stopAutoplay } = useCarousel();

  useEffect(() => {
    bookService.getFavourites().then(setBooks).catch(console.error);
  }, []);

  if (books.length === 0) return null;

  return (
    <div
      className="mt-10 space-y-4"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <h3 className="text-xl font-semibold text-center text-textDark dark:text-textLight">
        Favorite Books
      </h3>

      <div className="relative">
        {/* Scroll Left */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-110 transition-transform border border-gray-300 dark:border-gray-600"
          aria-label="Scroll Left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Scroll Container */}
        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide px-8">
          <div className="flex gap-4 py-2">
            {books.map((book) => (
              <div
                key={book.id}
                onClick={() => navigate(`/book/${book.id}`)}
                className="min-w-[140px] sm:min-w-[160px] cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-300 dark:border-gray-600 p-2 transition-transform hover:scale-105"
              >
                <img
                  src={`http://localhost:5209${
                    book.coverImageUrl ?? "/Images/books/default.jpg"
                  }`}
                  alt={book.title}
                  className="w-full h-40 object-cover rounded"
                />
                <p className="mt-2 text-sm text-center font-medium text-gray-800 dark:text-gray-200 truncate">
                  {book.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Right */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow hover:scale-110 transition-transform border border-gray-300 dark:border-gray-600"
          aria-label="Scroll Right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FavoriteBooksCarousel;
