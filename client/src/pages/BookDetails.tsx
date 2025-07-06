import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bookService from "../services/bookService";
import type { BookDetailsDTO } from "../types";
import ConfirmDialog from "../components/common/ConfirmDialog";
import FavoriteButton from "../components/books/FavoriteButton";
import RatingStars from "../components/books/RatingStars";

const BookDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookDetailsDTO | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [togglingFavorite, setTogglingFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      bookService
        .getById(id)
        .then(setBook)
        .catch(() => navigate("/dashboard"));
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await bookService.remove(id);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to delete book:", err);
    }
  };

  const handleToggleFavorite = async () => {
    if (!book) return;
    setTogglingFavorite(true);
    try {
      await bookService.toggleFavorite(book.id, !book.isFavourite);
      setBook({ ...book, isFavourite: !book.isFavourite });
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    } finally {
      setTogglingFavorite(false);
    }
  };

  if (!book) {
    return (
      <div className="p-6 text-center text-textDark dark:text-textLight">
        Loading book details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-backgroundLight to-background dark:from-background dark:to-backgroundLight flex items-center justify-center px-4 transition-colors duration-300">
      <div className="relative w-full max-w-3xl">
        <FavoriteButton
          isFavourite={book.isFavourite}
          onClick={handleToggleFavorite}
          disabled={togglingFavorite}
        />

        <div className="bg-backgroundLight dark:bg-background text-textDark dark:text-textLight p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 space-y-6 transition-colors duration-300">
          <h2 className="text-3xl sm:text-4xl font-bold text-center font-heading">
            Book Details
          </h2>

          <div className="flex flex-col sm:flex-row gap-6">
            <img
              src={`http://localhost:5209${
                book.coverImageUrl ?? "/Images/books/default.jpg"
              }`}
              alt={book.title}
              className="w-full sm:w-1/3 h-auto rounded-xl object-cover border border-gray-400 shadow-md"
            />

            <div className="flex-1 space-y-2 text-sm sm:text-base">
              <p>
                <strong>Title:</strong> {book.title}
              </p>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
              <p>
                <strong>Status:</strong> {book.status}
              </p>
              {book.rating && (
                <p className="flex items-center gap-2">
                  <strong>Rating:</strong> <RatingStars rating={book.rating} />
                </p>
              )}
              {book.review && (
                <p>
                  <strong>Review:</strong> <i>{book.review}</i>
                </p>
              )}
              {book.dateCompleted && (
                <p>
                  <strong>Completed:</strong>{" "}
                  {new Date(book.dateCompleted).toLocaleDateString()}
                </p>
              )}
              <p>
                <strong>Added:</strong>{" "}
                {new Date(book.dateAdded).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={() => navigate(`/edit/${book.id}`)}
              className="text-sm px-4 py-2 rounded-lg transition-colors duration-300 
                bg-primary text-white hover:bg-secondary 
                dark:bg-blue-400 dark:hover:bg-blue-600 dark:text-gray-900"
            >
              Edit Book
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="text-sm px-4 py-2 rounded-lg transition-colors duration-300 
                bg-red-500 hover:bg-red-600 text-white 
                dark:bg-red-400 dark:hover:bg-red-600 dark:text-gray-900"
            >
              Delete Book
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete "${book.title}"?`}
      />
    </div>
  );
};

export default BookDetails;
