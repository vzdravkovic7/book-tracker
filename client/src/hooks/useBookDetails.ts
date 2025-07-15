import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { BookDetailsDTO } from "../types";
import bookService from "../services/bookService";
import suggestionService from "../services/suggestionService";

export const useBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<BookDetailsDTO | null>(null);
  const [togglingFavorite, setTogglingFavorite] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);

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

  const handleSendSuggestion = async (toUserEmail: string) => {
    if (!book) return;

    try {
      await suggestionService.suggestBook({ bookId: book.id, toUserEmail });
      alert(`Suggestion sent to ${toUserEmail} successfully!`);
    } catch (error) {
      console.error("Error sending suggestion:", error);
      alert("Failed to send suggestion.");
    } finally {
      setShowEmailDialog(false);
    }
  };

  return {
    book,
    togglingFavorite,
    showConfirm,
    showEmailDialog,
    setShowConfirm,
    setShowEmailDialog,
    handleToggleFavorite,
    handleDelete,
    handleSendSuggestion,
    navigate,
  };
};
