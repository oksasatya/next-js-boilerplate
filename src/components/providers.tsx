"use client";

import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { GlobalLoadingProvider } from "@/components/providers/global-loading-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import React, { useEffect, useRef } from "react";
import { ensureI18n } from "@/lib/i18n";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { usePathname } from "next/navigation";
import { useLoadingStore } from "@/lib/loading-store";

// Initialize i18n before any component renders
ensureI18n();

function NavigationLoading() {
  const pathname = usePathname();
  const { setIsLoading } = useLoadingStore();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    if (prevPath.current === null) {
      prevPath.current = pathname ?? "";
      return;
    }

    // Delay showing to avoid flicker on very fast transitions
    const showTimer = setTimeout(() => setIsLoading(true), 120);
    // Ensure it hides even if no explicit stop signal arrives
    const hideTimer = setTimeout(() => setIsLoading(false), 900);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      // Hide immediately when the new route has mounted
      setIsLoading(false);
      prevPath.current = pathname ?? "";
    };
  }, [pathname, setIsLoading]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <GlobalLoadingProvider>
          <SmoothScrollProvider>
            {/* Navigation-based global loading controller */}
            <NavigationLoading />
            {children}
          </SmoothScrollProvider>
        </GlobalLoadingProvider>
      </ThemeProvider>
    </Provider>
  );
}
