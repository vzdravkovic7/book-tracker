import React from "react";

const BookIconWatermark: React.FC = () => {
  return (
    <svg
      className="absolute w-[300px] h-[300px] opacity-10 text-gray-300 dark:text-gray-700 -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 7H20v13H6.5A2.5 2.5 0 014 17.5v-13z" />
    </svg>
  );
};

export default BookIconWatermark;
