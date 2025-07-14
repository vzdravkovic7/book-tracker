import React from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FadeInOnScroll: React.FC<Props> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;
