import React from "react";

interface Props {
  title: string;
  onDownload?: () => void;
  onCopy?: () => void;
  children: React.ReactNode;
}

const ChartCard: React.FC<Props> = ({
  title,
  onDownload,
  onCopy,
  children,
}) => {
  return (
    <div className="bg-white dark:bg-background border border-gray-300 dark:border-gray-700 shadow-lg rounded-2xl p-4 text-textDark dark:text-textLight transition-transform transform hover:scale-[1.02] hover:shadow-xl duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex gap-2">
          {onCopy && (
            <button
              onClick={onCopy}
              className="text-sm px-4 py-2 rounded-lg transition-colors duration-300 
                bg-primary text-white hover:bg-secondary 
                dark:bg-blue-400 dark:hover:bg-blue-600 dark:text-gray-900"
            >
              Copy
            </button>
          )}
          {onDownload && (
            <button
              onClick={onDownload}
              className="text-sm px-4 py-2 rounded-lg transition-colors duration-300 
                bg-green-600 text-white hover:bg-green-700 
                dark:bg-green-400 dark:hover:bg-green-600 dark:text-gray-900"
            >
              Download
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default ChartCard;
