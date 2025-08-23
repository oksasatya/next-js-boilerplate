// components/ui/theme-toggle.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Monitor } from "lucide-react";
import { useThemeStore, type Theme } from "@/lib/theme-store";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "button" | "dropdown";
  size?: "sm" | "default" | "lg";
  className?: string;
  showLabel?: boolean;
}

const themeConfig = {
  light: {
    icon: Sun,
    label: "Light",
    color: "text-orange-500",
  },
  dark: {
    icon: Moon,
    label: "Dark",
    color: "text-blue-500 dark:text-blue-400",
  },
  system: {
    icon: Monitor,
    label: "System",
    color: "text-muted-foreground",
  },
};

export function ThemeToggle({
  variant = "dropdown",
  size = "sm",
  className,
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useThemeStore();

  // Simple button toggle (cycles through themes)
  if (variant === "button") {
    const handleToggle = () => {
      const themeOrder: Theme[] = ["light", "dark", "system"];
      const currentIndex = themeOrder.indexOf(theme);
      const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
      setTheme(nextTheme);
    };

    const config = themeConfig[theme];
    const Icon = config.icon;

    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size={size}
          onClick={handleToggle}
          className={cn(
            "relative overflow-hidden rounded-lg p-2 transition-all duration-300",
            className,
          )}
        >
          <div className="relative flex items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ opacity: 0, rotate: -180, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 180, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <Icon className={cn("h-4 w-4", config.color)} />
              </motion.div>
            </AnimatePresence>

            {showLabel && <span className="text-sm font-medium">{config.label}</span>}
          </div>
        </Button>
      </motion.div>
    );
  }

  // Dropdown variant (default) - using shadcn styling
  const currentConfig = themeConfig[theme];
  const CurrentIcon = currentConfig.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size={size}
            className={cn(
              "relative overflow-hidden rounded-lg p-2 transition-all duration-300",
              className,
            )}
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <CurrentIcon className={cn("h-4 w-4", currentConfig.color)} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Theme indicator dot */}
            <motion.div
              className={cn(
                "absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full",
                resolvedTheme === "dark" ? "bg-blue-400" : "bg-orange-400",
              )}
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </Button>
        </motion.div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {(Object.keys(themeConfig) as Theme[]).map((themeOption) => {
          const config = themeConfig[themeOption];
          const Icon = config.icon;
          const isActive = theme === themeOption;

          return (
            <DropdownMenuItem
              key={themeOption}
              onClick={() => setTheme(themeOption)}
              className={cn(
                "flex cursor-pointer items-center gap-3",
                isActive && "bg-accent text-accent-foreground",
              )}
            >
              <div className="relative">
                <Icon className={cn("h-4 w-4", config.color)} />
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-primary absolute -top-1 -right-1 h-2 w-2 rounded-full"
                  />
                )}
              </div>

              <span className="flex-1 text-sm font-medium">{config.label}</span>

              {themeOption === "system" && (
                <span className="text-muted-foreground text-xs">({resolvedTheme})</span>
              )}
            </DropdownMenuItem>
          );
        })}

        {/* Theme preview divider */}
        <div className="bg-border my-1 h-px" />

        {/* Theme preview */}
        <div className="px-2 py-1.5">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            <span className="text-muted-foreground text-xs">
              Current: {themeConfig[theme].label}
            </span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
