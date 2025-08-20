"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en/common.json";
import id from "@/locales/id/common.json";

let initialized = false;

export function ensureI18n() {
  if (initialized) return;

  // Try to restore the previously selected language from localStorage (or default to 'en')
  let savedLng: string | undefined;
  if (typeof window !== "undefined") {
    try {
      savedLng = localStorage.getItem("i18nextLng") || localStorage.getItem("lng") || undefined;
    } catch {
      // ignore
    }
  }
  const supported = ["en", "id"] as const;
  type SupportedLng = (typeof supported)[number];
  const isSupported = (lng: string): lng is SupportedLng =>
    (supported as readonly string[]).includes(lng);

  const initialLng: SupportedLng = isSupported(savedLng ?? "") ? (savedLng as SupportedLng) : "en";

  i18n.use(initReactI18next).init({
    resources: { en: { translation: en }, id: { translation: id } },
    lng: initialLng,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

  // Keep <html lang> in sync and persist selection
  i18n.on("languageChanged", (lng) => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lng;
    }
    try {
      localStorage.setItem("i18nextLng", lng);
    } catch {
      // ignore persistence errors
    }
  });

  if (typeof document !== "undefined") {
    document.documentElement.lang = initialLng;
  }

  initialized = true;
}
