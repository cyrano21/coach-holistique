"use client";

import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const iconClasses =
    "absolute inset-0 w-6 h-6 transition-opacity duration-500";

  return (
    <button
      onClick={toggleTheme}
      className="relative w-8 h-8 flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none text-white dark:text-yellow-300"
      title="Changer le thème"
      aria-label="Changer le thème"
    >
      {/* Soleil */}
      <svg
        className={`${iconClasses} ${
          theme === "light" ? "opacity-100 rotate-0" : "opacity-0 rotate-45"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 15a5 5 0 100-10 5 5 0 000 10zm0 4a1 1 0 011-1 1 1 0 110 2 1 1 0 01-1-1zm0-18a1 1 0 011 1 1 1 0 11-2 0 1 1 0 011-1zm9 9a1 1 0 01-1 1 1 1 0 110-2 1 1 0 011 1zm-18 0a1 1 0 011-1 1 1 0 110 2 1 1 0 01-1-1zm14.95 5.536a1 1 0 011.414 0 1 1 0 01-1.414 1.414 1 1 0 010-1.414zM4.05 4.464a1 1 0 011.414 0 1 1 0 01-1.414 1.414 1 1 0 010-1.414zm12.728-1.414a1 1 0 010 1.414 1 1 0 01-1.414-1.414 1 1 0 011.414 0zM4.05 15.536a1 1 0 010 1.414 1 1 0 01-1.414-1.414 1 1 0 011.414 0z" />
      </svg>

      {/* Lune */}
      <svg
        className={`${iconClasses} ${
          theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 -rotate-45"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M17.293 13.293a8 8 0 11-10.586-10.586A8 8 0 0017.293 13.293z" />
      </svg>
    </button>
  );
}
