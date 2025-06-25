import React from "react";

const FormError: React.FC<{ message: string }> = ({ message }) => {
  if (!message) return null;

  return (
    <p className="text-text-alert text-sm text-center border border-red-500 bg-red-500/10 dark:bg-red-500/20 py-2 px-3 rounded transition-colors duration-300">
      {message}
    </p>
  );
};

export default FormError;
