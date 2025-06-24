import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState<boolean>(
    () => localStorage.getItem("theme") === "dark"
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
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
    <nav className="bg-background-light text-text-light px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-heading text-white">BookTracker</h1>

      <div className="flex gap-4 items-center">
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark((prev) => !prev)}
          className="text-sm text-white border border-gray-600 px-3 py-1 rounded hover:bg-gray-700 transition"
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>

        {!isLoggedIn ? (
          <Link
            to="/login"
            className="text-sm bg-primary hover:bg-secondary text-white px-4 py-2 rounded transition"
          >
            Sign In
          </Link>
        ) : (
          <>
            <Link
              to="/add"
              className="text-sm bg-primary hover:bg-secondary text-white px-4 py-2 rounded transition"
            >
              Add Book
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
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
