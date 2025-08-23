"use client";

import { useEffect } from "react";

// This script prevents FOUC (Flash of Unstyled Content) by applying theme before React hydration
export const ThemeScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function getTheme() {
              try {
                const stored = localStorage.getItem('theme-storage');
                if (stored) {
                  const parsed = JSON.parse(stored);
                  return parsed.state?.theme || 'system';
                }
              } catch (e) {}
              return 'system';
            }
            
            function getResolvedTheme(theme) {
              if (theme === 'system') {
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              return theme;
            }
            
            const theme = getTheme();
            const resolvedTheme = getResolvedTheme(theme);
            
            document.documentElement.setAttribute('data-theme', resolvedTheme);
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(resolvedTheme);
          })();
        `,
      }}
    />
  );
};
