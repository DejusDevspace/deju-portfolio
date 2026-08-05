"use client";

import { useTheme as useNextTheme } from "next-themes";
import type { Theme } from "@/types";

export default function useTheme() {
	const { theme, setTheme } = useNextTheme();
	const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
	return { theme: (theme as Theme) ?? "dark", toggleTheme };
}
