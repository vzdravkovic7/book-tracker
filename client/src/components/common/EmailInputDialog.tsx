import React, { useState, useEffect } from "react";

interface EmailInputDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: (email: string) => void;
  message?: string;
}

const EmailInputDialog: React.FC<EmailInputDialogProps> = ({
  open,
  onCancel,
  onConfirm,
  message = "Enter your friend's email to suggest this book:",
}) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (open) setEmail("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-background border border-gray-300 dark:border-gray-700 text-textDark dark:text-textLight p-6 rounded-xl shadow-xl max-w-sm w-full space-y-4 transition-colors duration-300">
        <p className="text-sm text-center">{message}</p>
        <input
          type="email"
          placeholder="friend@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-textDark dark:text-white"
        />
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg transition-colors duration-300 
              bg-gray-200 hover:bg-gray-300 text-textDark 
              dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(email)}
            disabled={!email.trim()}
            className="px-4 py-2 text-sm rounded-lg transition-colors duration-300 
              bg-green-600 hover:bg-green-700 text-white 
              dark:bg-green-400 dark:hover:bg-green-600 dark:text-gray-900"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailInputDialog;
