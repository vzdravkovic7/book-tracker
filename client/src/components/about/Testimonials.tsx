import React from "react";
import FadeInOnScroll from "../common/FadeInOnScroll";

const Testimonials: React.FC = () => {
  return (
    <FadeInOnScroll className="text-center max-w-3xl px-4 space-y-6 opacity-70">
      <h3 className="text-2xl sm:text-3xl font-bold font-heading">
        What Readers Say (Coming Soon)
      </h3>
      <p className="text-gray-600 dark:text-gray-400 italic">
        “This space will soon feature stories from passionate readers who use
        Book Tracker to stay connected with their books.”
      </p>
    </FadeInOnScroll>
  );
};

export default Testimonials;
