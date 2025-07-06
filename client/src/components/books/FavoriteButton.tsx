import React from "react";

interface Props {
  isFavourite: boolean;
  onClick: () => void;
  disabled: boolean;
}

const FavoriteButton: React.FC<Props> = ({
  isFavourite,
  onClick,
  disabled,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={isFavourite ? "Remove from favorites" : "Add to favorites"}
    className="absolute top-4 right-4 p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
    aria-label="Toggle Favorite"
  >
    <div className="transition-transform duration-300 ease-in-out hover:scale-110">
      {isFavourite ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 fill-yellow-400"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M12 .587l3.668 7.568L24 9.75l-6 5.768L19.335 24 12 20.063 4.665 24 6 15.518 0 9.75l8.332-1.595z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 
            18.18 21.02 12 17.77 5.82 21.02 
            7 14.14 2 9.27 8.91 8.26 12 2"
          />
        </svg>
      )}
    </div>
  </button>
);

export default FavoriteButton;
