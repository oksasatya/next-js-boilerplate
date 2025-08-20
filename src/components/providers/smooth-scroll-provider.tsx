"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

// Optional: adjust this if you have a fixed header height
const DEFAULT_OFFSET_Y = 0;

function findAnchor(el: Element | null): HTMLAnchorElement | null {
  while (el) {
    if (el instanceof HTMLAnchorElement) return el;
    el = el.parentElement;
  }
  return null;
}

function getHashTarget(href: string): string | null {
  // Direct hash (e.g., #section)
  if (href.startsWith("#")) return href.slice(1);

  try {
    const url = new URL(href, window.location.href);
    const isSamePage =
      url.origin === window.location.origin && url.pathname === window.location.pathname;
    if (isSamePage && url.hash && url.hash.length > 1) {
      return url.hash.slice(1);
    }
  } catch (_) {
    // ignore invalid URL
  }
  return null;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const anchor = findAnchor(target);
      if (!anchor) return;

      // Don't hijack modified clicks or new tab/windows
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || anchor.target === "_blank") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href") || "";
      const id = getHashTarget(href);
      if (!id) return;
      if (anchor.getAttribute("data-no-smooth") === "true") return;

      const el = document.getElementById(id);
      if (!el) return;

      // Prevent default jump
      e.preventDefault();

      const offsetAttr = anchor.getAttribute("data-offset-y");
      const offsetY = offsetAttr ? parseInt(offsetAttr, 10) || 0 : DEFAULT_OFFSET_Y;

      gsap.to(window, {
        duration: 0.8,
        ease: "power2.out",
        scrollTo: { y: el, offsetY, autoKill: true },
      });
    };

    document.addEventListener("click", handleClick, { capture: true });

    // If page loads with a hash, animate to it after load
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        // Prevent initial jump positioning and then animate
        window.scrollTo({ top: 0 });
        requestAnimationFrame(() => {
          gsap.to(window, {
            duration: 0.8,
            ease: "power2.out",
            scrollTo: { y: el, offsetY: DEFAULT_OFFSET_Y, autoKill: true },
            delay: 0.05,
          });
        });
      }
    }

    return () => {
      document.removeEventListener("click", handleClick, { capture: true } as any);
    };
  }, []);

  return <>{children}</>;
}
