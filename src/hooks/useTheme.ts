import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

export function useTheme() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem(STORAGE_KEY, next ? "light" : "dark");
  };

  return { isLight, toggle };
}

/** Apply the persisted (or system) theme + saved language once on mount. */
export function applyStoredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored ?? (prefersDark ? "dark" : "light");
  document.documentElement.classList.toggle("light", theme === "light");
}
