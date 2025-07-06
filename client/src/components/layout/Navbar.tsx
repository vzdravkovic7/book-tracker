import React from "react";
import NavbarMenuItems from "./NavbarMenuItems";
import { useNavbarState } from "../../hooks/useNavbarState";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const {
    isDark,
    isLoggedIn,
    menuOpen,
    dropdownRef,
    toggleTheme,
    toggleMenu,
    handleLogout,
  } = useNavbarState();

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

      <div className="hidden md:flex gap-4 items-center">
        <NavbarMenuItems
          isDark={isDark}
          isLoggedIn={isLoggedIn}
          onToggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
      </div>

      <button
        onClick={toggleMenu}
        className="md:hidden text-textDark dark:text-textLight"
        aria-label="Toggle Menu"
      >
        {menuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {menuOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-20 right-6 w-56 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide bg-backgroundLight dark:bg-background shadow-lg rounded-lg p-4 flex flex-col gap-3 items-start md:hidden z-50"
        >
          <NavbarMenuItems
            isDark={isDark}
            isLoggedIn={isLoggedIn}
            onToggleTheme={toggleTheme}
            onLogout={handleLogout}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
