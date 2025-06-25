import React from "react";

interface LoadingButtonProps {
  loading: boolean;
  text: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ loading, text }) => (
  <button
    type="submit"
    className="w-full py-3 bg-primary hover:bg-secondary active:bg-blue-900 rounded-lg text-white font-semibold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-60"
    disabled={loading}
  >
    {loading && (
      <svg
        className="animate-spin h-5 w-5 mr-2 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
        />
      </svg>
    )}
    {loading ? "Signing in..." : text}
  </button>
);

export default LoadingButton;
