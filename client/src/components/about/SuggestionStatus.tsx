import React from "react";
import { motion } from "framer-motion";

interface Props {
  loading: boolean;
  message: string;
}

const SuggestionStatus: React.FC<Props> = ({ loading, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center flex flex-col items-center gap-4"
    >
      {loading && (
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50" />
      )}
      <p className="text-lg">{message}</p>
    </motion.div>
  );
};

export default SuggestionStatus;
