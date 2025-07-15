import React from "react";

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <span className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 inline-block mr-1"
          viewBox="0 0 24 24"
          fill={i <= rating ? "#facc15" : "none"}
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
      ))}
    </span>
  );
};

export default RatingStars;
