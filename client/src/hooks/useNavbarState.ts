import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { disconnectSuggestionSocket } from "../services/suggestionSocket";

export const useNavbarState = () => {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | PointerEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    disconnectSuggestionSocket();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return {
    isDark,
    isLoggedIn,
    menuOpen,
    dropdownRef,
    toggleButtonRef,
    toggleTheme: () => setIsDark((prev) => !prev),
    toggleMenu: () => setMenuOpen((prev) => !prev),
    handleLogout,
  };
};
