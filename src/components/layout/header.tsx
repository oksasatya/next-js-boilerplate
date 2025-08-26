"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Search, Menu, Settings, User, LogOut, HelpCircle, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { ensureI18n } from "@/lib/i18n";
import { logout as localLogout } from "@/lib/auth";
import { useSidebarStore } from "@/lib/sidebar-store";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useThemeStore } from "@/lib/theme-store";
import { cn } from "@/lib/utils";

// Initialize i18n before hooks
ensureI18n();

// Language configuration (flags)
const languages = {
  en: {
    code: "en",
    name: "English",
    flag: (
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/emoji/48/united-kingdom-emoji.png"
        alt="English"
        className="h-5 w-5 rounded"
      />
    ),
  },
  id: {
    code: "id",
    name: "Bahasa Indonesia",
    flag: (
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/emoji/48/indonesia-emoji.png"
        alt="Indonesia"
        className="h-5 w-5 rounded"
      />
    ),
  },
} as const;

type LangKey = keyof typeof languages;

interface HeaderProps {
  onMenuClick?: () => void;
  userData?: {
    name?: string;
    email?: string;
    role?: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

export function Header({ onMenuClick, userData, onLogout }: HeaderProps) {
  const [notifications] = useState(3);
  const { t } = useTranslation();
  const { resolvedTheme } = useThemeStore();
  const currentLang = (i18next.language?.split("-")[0] as LangKey) || "en";
  const { open } = useSidebarStore();

  // Keep selection in sync with storage
  useEffect(() => {
    const saved = localStorage.getItem("i18nextLng");
    if (saved && saved !== i18next.language) {
      void i18next.changeLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang: LangKey) => {
    void i18next.changeLanguage(lang);
  };

  const handleLogout = () => {
    if (onLogout) return onLogout();
    localLogout();
  };

  const getUserInitials = () => {
    if (userData?.name) {
      return userData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return "AD";
  };

  const isDark = resolvedTheme === "dark";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300",
        isDark
          ? "border-gray-800 bg-gray-900/95 shadow-xl shadow-gray-900/20"
          : "border-gray-200/80 bg-white/95 shadow-lg shadow-gray-200/50",
      )}
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (onMenuClick ? onMenuClick() : open())}
            className={cn(
              "rounded-lg p-2 transition-all duration-200 lg:hidden",
              isDark
                ? "text-gray-300 hover:bg-gray-800"
                : "hover:bg-gradient-primary-hover text-gray-600",
            )}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Page Title */}
          <div className="hidden lg:block">
            <h1
              className={cn(
                "text-xl font-semibold transition-colors duration-300",
                isDark ? "text-gray-100" : "text-gray-900",
              )}
            >
              {t("dashboard.title", "Dashboard")}
            </h1>
            <p
              className={cn(
                "text-sm transition-colors duration-300",
                isDark ? "text-gray-400" : "text-gray-500",
              )}
            >
              {t("dashboard.welcome", "Welcome back")}, {userData?.name?.split(" ")[0] || "Admin"}
            </p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="mx-8 hidden max-w-md flex-1 md:flex">
          <div className="relative w-full">
            <Search
              className={cn(
                "absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform transition-colors duration-200",
                isDark ? "text-gray-500" : "text-gray-400",
              )}
            />
            <Input
              placeholder={t("search_placeholder", "Search anything...")}
              className={cn(
                "h-10 pr-4 pl-10 transition-all duration-200",
                isDark
                  ? "border-gray-700 bg-gray-800/50 text-gray-100 placeholder:text-gray-500 focus:border-blue-400 focus:bg-gray-800 focus:ring-blue-400/20"
                  : "border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:border-[var(--gradient-from)] focus:bg-white focus:ring-[var(--gradient-from)]/20",
              )}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Search button for mobile */}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-lg p-2 transition-all duration-200 md:hidden",
              isDark
                ? "text-gray-300 hover:bg-gray-800"
                : "hover:bg-gradient-primary-hover text-gray-600",
            )}
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle variant="dropdown" size="sm" className="transition-all duration-200" />

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-lg p-2 transition-all duration-200",
                    isDark
                      ? "text-gray-300 hover:bg-gray-800"
                      : "hover:bg-gradient-primary-hover text-gray-600",
                  )}
                >
                  {languages[currentLang]?.flag || (
                    <Globe className="h-4 w-4 text-[var(--gradient-from)]" />
                  )}
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className={cn(
                "w-48 backdrop-blur-xl",
                isDark ? "border-gray-700 bg-gray-900/95" : "border-gray-200 bg-white/95",
              )}
            >
              <DropdownMenuLabel className={isDark ? "text-gray-100" : "text-gray-900"}>
                {t("language", "Language")}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className={isDark ? "bg-gray-700" : "bg-gray-200"} />
              {(Object.keys(languages) as LangKey[]).map((code) => (
                <DropdownMenuItem
                  key={code}
                  onClick={() => changeLanguage(code)}
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    isDark
                      ? "text-gray-300 hover:bg-gray-800"
                      : "hover:bg-gradient-primary-hover text-gray-700",
                  )}
                >
                  <div className="flex w-full items-center gap-2">
                    {languages[code].flag}
                    <span>{languages[code].name}</span>
                    {currentLang === code && (
                      <span className="ml-auto text-[var(--gradient-from)]">✓</span>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "relative rounded-lg p-2 transition-all duration-200",
                isDark
                  ? "text-gray-300 hover:bg-gray-800"
                  : "hover:bg-gradient-primary-hover text-gray-600",
              )}
            >
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold text-white shadow-lg"
                >
                  {notifications}
                </motion.span>
              )}
            </Button>
          </motion.div>

          {/* Settings */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-lg p-2 transition-all duration-200",
                isDark
                  ? "text-gray-300 hover:bg-gray-800"
                  : "hover:bg-gradient-primary-hover text-gray-600",
              )}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0 transition-all duration-200 hover:ring-2 hover:ring-[var(--gradient-from)]/20"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={userData?.avatar || "/placeholder-avatar.jpg"} alt="User" />
                    <AvatarFallback
                      className={cn(
                        "font-semibold text-white",
                        isDark ? "bg-blue-600" : "bg-blue-500",
                      )}
                    >
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={cn(
                "w-56 backdrop-blur-xl",
                isDark ? "border-gray-700 bg-gray-900/95" : "border-gray-200 bg-white/95",
              )}
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p
                    className={cn(
                      "text-sm leading-none font-medium",
                      isDark ? "text-gray-100" : "text-gray-900",
                    )}
                  >
                    {userData?.name || "Administrator"}
                  </p>
                  <p
                    className={cn(
                      "text-xs leading-none",
                      isDark ? "text-gray-400" : "text-gray-500",
                    )}
                  >
                    {userData?.email || "admin@example.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className={isDark ? "bg-gray-700" : "bg-gray-200"} />
              <DropdownMenuItem
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isDark
                    ? "text-gray-300 hover:bg-gray-800"
                    : "hover:bg-gradient-primary-hover text-gray-700",
                )}
              >
                <User className="mr-2 h-4 w-4" />
                <span>{t("profile", "Profile")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isDark
                    ? "text-gray-300 hover:bg-gray-800"
                    : "hover:bg-gradient-primary-hover text-gray-700",
                )}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>{t("settings", "Settings")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isDark
                    ? "text-gray-300 hover:bg-gray-800"
                    : "hover:bg-gradient-primary-hover text-gray-700",
                )}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>{t("help", "Help")}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className={isDark ? "bg-gray-700" : "bg-gray-200"} />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t("logout", "Log out")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
