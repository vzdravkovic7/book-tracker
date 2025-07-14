import React from "react";
import FadeInOnScroll from "../common/FadeInOnScroll";

const WhoIsItFor: React.FC = () => {
  return (
    <FadeInOnScroll className="text-center max-w-4xl px-4 space-y-6">
      <h3 className="text-2xl sm:text-3xl font-bold font-heading">
        Who is Book Tracker For?
      </h3>
      <ul className="grid sm:grid-cols-2 gap-6 text-left text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        <li>
          📖 Readers who want to keep a history of everything they’ve read.
        </li>
        <li>
          🧠 Learners looking to revisit notes and impressions from books.
        </li>
        <li>🌱 Habit-builders aiming to read more consistently.</li>
        <li>🎯 Goal-setters tracking yearly reading challenges.</li>
        <li>📚 Collectors who love curating their own digital library.</li>
        <li>💬 Thinkers who enjoy writing reviews and reflections.</li>
      </ul>
    </FadeInOnScroll>
  );
};

export default WhoIsItFor;
