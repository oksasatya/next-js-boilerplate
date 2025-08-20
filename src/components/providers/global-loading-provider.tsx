"use client";
import { GlobalLoading } from "@/components/ui/global-loading";
import React from "react";

export function GlobalLoadingProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <GlobalLoading />
    </>
  );
}
