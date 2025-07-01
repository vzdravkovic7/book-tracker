import React, { useState } from "react";
import type { Book } from "../../types";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../common/ConfirmDialog";
import axios from "../../services/api";

interface Props {
  book: Book;
  onDelete: (id: string) => void;
}

const BookCard: React.FC<Props> = ({ book, onDelete }) => {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/books/${book.id}`);
      onDelete(book.id);
      setConfirmOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${book.id}`);
  };

  return (
    <>
      <div className="bg-white dark:bg-background border border-gray-300 dark:border-gray-700 shadow-lg rounded-2xl p-5 space-y-3 text-textDark dark:text-textLight ease-in-out transform hover:scale-[1.025] hover:shadow-xl transition-colors duration-300">
        <h4 className="text-xl font-semibold text-textDark dark:text-textLight font-heading">
          {book.title}
        </h4>
        <p className="text-sm text-textDark dark:text-textLight">
          by {book.author}
        </p>
        <p className="text-sm text-textDark/80 dark:text-textLight/80">
          Status: {book.status}
        </p>
        {book.rating && (
          <p className="text-sm text-textDark/80 dark:text-textLight/80">
            Rating: {book.rating}/5
          </p>
        )}
        {book.review && (
          <p className="text-sm italic text-textDark/70 dark:text-textLight/70">
            "{book.review}"
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleEdit}
            className="flex-1 py-2 text-sm rounded-lg transition-colors duration-300 
            bg-primary hover:bg-secondary text-white 
            dark:bg-blue-400 dark:hover:bg-blue-600 dark:text-gray-900"
          >
            Edit
          </button>
          <button
            onClick={() => setConfirmOpen(true)}
            className="flex-1 py-2 text-sm rounded-lg transition-colors duration-300 
            bg-red-500 hover:bg-red-600 text-white 
            dark:bg-red-400 dark:hover:bg-red-600 dark:text-gray-900"
          >
            Delete
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete "${book.title}"?`}
      />
    </>
  );
};

export default BookCard;
