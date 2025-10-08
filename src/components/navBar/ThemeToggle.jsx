import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // Read from localStorage if available
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  // Apply theme to body
  useEffect(() => {
    const body = document.body;
    if (theme === "light") {
      body.classList.add("light-mode");
    } else {
      body.classList.remove("light-mode");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-[var(--color-accent)] hover:shadow-[var(--shadow-neon)] transition"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <FaMoon className="text-[var(--color-accent)] text-[20px]" />
      ) : (
        <FaSun className="text-[var(--color-accent)] text-[20px]" />
      )}
    </button>
  );
};

export default ThemeToggle;
