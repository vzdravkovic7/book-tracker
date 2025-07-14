import React from "react";
import FadeInOnScroll from "../common/FadeInOnScroll";

const Icon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
    {children}
  </div>
);

const WhyBookTracker: React.FC = () => {
  return (
    <FadeInOnScroll className="text-left space-y-8 w-full">
      <h3 className="text-2xl sm:text-3xl font-bold text-center">
        Why Book Tracker?
      </h3>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex gap-4 items-start">
          <Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Icon>
          <div>
            <h4 className="font-semibold text-lg">Track Your Reading</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Organize your books by status — whether you're currently reading,
              finished, or planning to dive in.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 20l9-5-9-5-9 5 9 5z" />
              <path d="M12 12l9-5-9-5-9 5 9 5z" />
            </svg>
          </Icon>
          <div>
            <h4 className="font-semibold text-lg">Gain Insights</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Visualize your progress and discover reading patterns over time.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 11c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2z" />
              <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z" />
            </svg>
          </Icon>
          <div>
            <h4 className="font-semibold text-lg">Simple and Private</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              No clutter, no pressure. Just you, your books, and the space to
              grow.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M8 17l4 4 4-4m-4-5v9" />
              <path d="M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />
            </svg>
          </Icon>
          <div>
            <h4 className="font-semibold text-lg">Always Evolving</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              New features, visualizations, and ways to interact with your books
              are always in the works.
            </p>
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
};

export default WhyBookTracker;
