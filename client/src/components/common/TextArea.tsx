import React from "react";

interface TextAreaProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-textDark dark:text-textLight transition-colors duration-300">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3 bg-white dark:bg-background text-textDark dark:text-textLight border border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
    />
  </div>
);

export default TextArea;
