import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeScript } from "@/components/theme-script";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import React from "react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "AdminFlow - Modern Dashboard",
  description: "Frontend-only Next 15 with Tailwind v4, shadcn, RTK Query, Zod, i18n, Dark Mode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${dmSans.variable} bg-background text-foreground font-sans antialiased`}>
        <Providers>
          {/* Global Theme Toggle - only show on non-admin pages */}
          <div className="[&]:not(.admin-layout) admin-layout:hidden fixed top-6 right-6 z-50 block">
            <ThemeToggle
              variant="dropdown"
              className="bg-background border-border border shadow-lg"
            />
          </div>

          {children}

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
