import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

function getResolvedTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  }
  return theme;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",
      resolvedTheme: "light",
      setTheme: (theme: Theme) => {
        const resolvedTheme = getResolvedTheme(theme);

        // Update document class immediately
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", resolvedTheme);

          // Also add class for Tailwind compatibility
          document.documentElement.classList.remove("light", "dark");
          document.documentElement.classList.add(resolvedTheme);
        }

        set({ theme, resolvedTheme });
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Apply theme immediately on hydration
          const resolvedTheme = getResolvedTheme(state.theme);
          state.resolvedTheme = resolvedTheme;

          if (typeof document !== "undefined") {
            document.documentElement.setAttribute("data-theme", resolvedTheme);
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(resolvedTheme);
          }
        }
      },
    },
  ),
);
