import React from "react";

interface Props {
  title: string;
  open?: boolean;
  children: React.ReactNode;
  className?: string;
}

const FilterCardSection: React.FC<Props> = ({
  title,
  open = false,
  children,
  className = "",
}) => {
  return (
    <details open={open} className={`group mb-6 ${className}`}>
      <summary className="cursor-pointer text-lg font-semibold text-textDark dark:text-textLight hover:underline">
        {title}
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
};

export default FilterCardSection;
