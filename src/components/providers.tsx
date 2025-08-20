"use client";

import { store } from "@/lib/store";
import { Provider } from "react-redux";
import { GlobalLoadingProvider } from "@/components/providers/global-loading-provider";
import React from "react";
import { ensureI18n } from "@/lib/i18n";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

// Initialize i18n before any component renders
ensureI18n();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <GlobalLoadingProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </GlobalLoadingProvider>
    </Provider>
  );
}
