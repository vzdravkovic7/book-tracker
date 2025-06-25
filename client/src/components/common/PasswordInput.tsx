import React, { useState } from "react";

interface PasswordInputProps {
  name: string;
  value: string;
  label: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  showError?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  value,
  label,
  placeholder,
  onChange,
  required = false,
  showError = false,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-textDark dark:text-textLight transition-colors duration-300">
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-3 bg-white dark:bg-background text-textDark dark:text-textLight border ${
            showError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-700 focus:ring-primary"
          } rounded-lg placeholder-gray-500 dark:placeholder-gray-400 text-sm pr-10 focus:outline-none focus:ring-2 transition-colors duration-300`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
          tabIndex={-1}
        >
          {show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 011.828-5.757m4.157-2.054A9.959 9.959 0 0112 3c5.523 0 10 4.477 10 10 0 1.043-.158 2.047-.452 2.99M3 3l18 18"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
