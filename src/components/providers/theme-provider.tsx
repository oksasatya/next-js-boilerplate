"use client";

import React, { useEffect, useLayoutEffect } from "react";
import { useThemeStore, type Theme } from "@/lib/theme-store";

function useIsomorphicLayoutEffect(effect: React.EffectCallback, deps?: React.DependencyList) {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(effect, deps);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(effect, deps);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore();

  // Apply theme on mount and handle system theme changes
  useIsomorphicLayoutEffect(() => {
    // Initialize theme from store or fallback to system
    const currentTheme = theme || "system";
    setTheme(currentTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        setTheme("system"); // This will trigger re-resolution
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, setTheme]);

  return <>{children}</>;
}
