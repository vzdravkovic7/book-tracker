import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useSuggestions } from "../../contexts/SuggestionsContext";

interface Props {
  isDark: boolean;
  isLoggedIn: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
}

const NavbarMenuItems: React.FC<Props> = ({
  isDark,
  isLoggedIn,
  onToggleTheme,
  onLogout,
}) => {
  const { pendingCount } = useSuggestions();

  return (
    <>
      <ThemeToggle isDark={isDark} toggleTheme={onToggleTheme} />

      {!isLoggedIn ? (
        <Link
          to="/login"
          className="text-sm px-4 py-2 rounded-2xl hover:rounded-lg transition-all duration-300 
            bg-primary text-white hover:bg-secondary 
            dark:bg-blue-400 dark:hover:bg-blue-600 dark:text-gray-900"
        >
          Sign In
        </Link>
      ) : (
        <>
          <Link
            to="/add"
            className="text-sm px-4 py-2 rounded-2xl hover:rounded-lg transition-all duration-300 
              bg-primary text-white hover:bg-secondary 
              dark:bg-blue-400 dark:hover:bg-blue-600 dark:text-gray-900"
          >
            Add Book
          </Link>
          <Link
            to="/profile"
            className="text-sm px-4 py-2 rounded-2xl hover:rounded-lg transition-all duration-300 
              bg-primary text-white hover:bg-secondary 
              dark:bg-blue-400 dark:hover:bg-blue-600 dark:text-gray-900"
          >
            Profile
          </Link>
          <Link
            to="/graphs"
            className="text-sm px-4 py-2 rounded-2xl hover:rounded-lg transition-all duration-300 
              bg-primary text-white hover:bg-secondary 
              dark:bg-blue-400 dark:hover:bg-blue-600 dark:text-gray-900"
          >
            Graphs & Charts
          </Link>

          <Link
            to="/suggestions"
            className="relative inline-flex items-center text-sm px-4 py-2 rounded-2xl hover:rounded-lg transition-all duration-300 
              bg-primary text-white hover:bg-secondary 
              dark:bg-blue-400 dark:hover:bg-blue-600 dark:text-gray-900"
          >
            Suggestions
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </Link>

          <button
            onClick={onLogout}
            className="text-sm px-4 py-2 rounded-2xl hover:rounded-lg transition-all duration-300 
              bg-red-500 hover:bg-red-600 text-white 
              dark:bg-red-400 dark:hover:bg-red-600 dark:text-gray-900"
          >
            Logout
          </button>
        </>
      )}
    </>
  );
};

export default NavbarMenuItems;
