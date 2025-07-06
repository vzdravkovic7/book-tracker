import { useEffect, useRef } from "react";

export const useCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    const container = scrollRef.current;
    if (!container) return;

    intervalRef.current = setInterval(() => {
      const atEnd =
        container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;

      if (atEnd) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 200, behavior: "smooth" });
      }
    }, 3000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const atStart = container.scrollLeft <= 10;
    const atEnd =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;

    if (direction === "left" && atStart) {
      container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
    } else if (direction === "right" && atEnd) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollBy({
        left: direction === "right" ? 200 : -200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, []);

  return {
    scrollRef,
    startAutoplay,
    stopAutoplay,
    scroll,
  };
};
