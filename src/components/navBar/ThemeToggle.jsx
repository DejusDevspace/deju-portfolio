import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

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
