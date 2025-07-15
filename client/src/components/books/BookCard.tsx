import React from "react";
import type { Book } from "../../types";
import { useNavigate } from "react-router-dom";
import { getStaticBaseUrl } from "../../utils/getApiBaseUrl";

interface Props {
  book: Book;
}

const BookCard: React.FC<Props> = ({ book }) => {
  const navigate = useNavigate();
  const baseStaticUrl = getStaticBaseUrl();

  const handleClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white dark:bg-background border border-gray-300 dark:border-gray-700 shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-[1.03] hover:shadow-xl duration-300"
    >
      <img
        src={`${baseStaticUrl}${
          book.coverImageUrl ?? "/Images/books/default.jpg"
        }`}
        alt={book.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-4 space-y-1 text-textDark dark:text-textLight text-center">
        <h4 className="text-lg font-bold truncate">{book.title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
          {book.author}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 italic">
          {book.genre}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
