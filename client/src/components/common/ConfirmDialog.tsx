import React from "react";

interface ConfirmDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onCancel,
  onConfirm,
  message,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-background border border-gray-300 dark:border-gray-700 text-textDark dark:text-textLight p-6 rounded-xl shadow-xl max-w-sm w-full space-y-4 transition-colors duration-300">
        <p className="text-sm text-center">{message}</p>
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
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg transition-colors duration-300 
            bg-red-500 hover:bg-red-600 text-white 
            dark:bg-red-400 dark:hover:bg-red-600 dark:text-gray-900"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
