import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "AdminFlow - Modern Dashboard",
  description: "Frontend-only Next 15 with Tailwind v4, shadcn, RTK Query, Zod, i18n",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
