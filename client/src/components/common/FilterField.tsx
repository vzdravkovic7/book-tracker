import React from "react";

interface Props {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const FilterField: React.FC<Props> = ({ label, children, className = "" }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm mb-1">{label}</label>
      {children}
    </div>
  );
};

export default FilterField;
