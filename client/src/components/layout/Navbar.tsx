import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-backgroundLight dark:bg-background text-textDark dark:text-textLight px-6 py-4 shadow-md flex justify-between items-center transition-colors duration-300">
      <div className="flex items-center gap-2">
        <img
          src={isDark ? "/logo-dark.png" : "/logo-light.png"}
          alt="Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 transition duration-300"
        />
        <Link to="/dashboard">
          <h1 className="text-xl font-heading text-textDark dark:text-textLight">
            BookTracker
          </h1>
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <ThemeToggle
          isDark={isDark}
          toggleTheme={() => setIsDark((prev) => !prev)}
        />

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

            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 rounded-2xl hover:rounded-lg transition-all duration-300 
              bg-red-500 hover:bg-red-600 text-white 
              dark:bg-red-400 dark:hover:bg-red-600 dark:text-gray-900"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
