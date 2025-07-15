import React from "react";
import FadeInOnScroll from "../common/FadeInOnScroll";

interface Props {
  onStart: () => void;
}

const IntroSection: React.FC<Props> = ({ onStart }) => {
  return (
    <FadeInOnScroll className="text-center max-w-4xl space-y-12 px-4">
      <div className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading">
          Welcome to Book Tracker
        </h2>
        <p className="text-lg sm:text-xl leading-relaxed">
          Your personal space to track, reflect, and rediscover your love for
          books. Book Tracker isn’t just a tool — it’s your reading companion.
        </p>
        <blockquote className="italic text-gray-600 dark:text-gray-300">
          “A reader lives a thousand lives before he dies. The man who never
          reads lives only one.”
          <br />
          <span className="text-sm">— George R.R. Martin</span>
        </blockquote>
        <button
          onClick={onStart}
          className="mt-4 px-6 py-3 rounded-lg text-white dark:text-black bg-primary hover:bg-secondary dark:bg-blue-400 dark:hover:bg-blue-600 shadow hover:opacity-90 transition-colors"
        >
          Get Started
        </button>
      </div>
    </FadeInOnScroll>
  );
};

export default IntroSection;
