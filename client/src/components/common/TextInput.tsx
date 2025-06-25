import React from "react";

interface TextInputProps {
  name: string;
  type?: string;
  value: string | number;
  label: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  type = "text",
  value,
  label,
  placeholder,
  onChange,
  required = false,
}) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-textDark dark:text-textLight transition-colors duration-300">
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-white dark:bg-background text-textDark dark:text-textLight border border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
      required={required}
    />
  </div>
);

export default TextInput;
