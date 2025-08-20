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
import { logout } from "@/lib/auth";

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
}

export function Header({ onMenuClick, userData }: HeaderProps) {
  const [notifications] = useState(3);
  const { t } = useTranslation();
  const currentLang = (i18next.language?.split("-")[0] as LangKey) || "en";
  // Keep selection in sync with storage (ensureI18n already sets from storage)
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
    logout();
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

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-xl"
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="hover:bg-gradient-primary-hover rounded-lg p-2 transition-all duration-200 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Page Title */}
          <div className="hidden lg:block">
            <h1 className="text-gray- text-xl font-semibold text-gray-900">
              {t("dashboard.title", "Dashboard")}
            </h1>
            <p className="text-sm text-gray-500">
              {t("dashboard.welcome", "Welcome back")}, {userData?.name?.split(" ")[0] || "Admin"}
            </p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="mx-8 hidden max-w-md flex-1 md:flex">
          <div className="relative w-full">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder={t("search_placeholder", "Search anything...")}
              className="h-10 border-gray-200 bg-gray-50/50 pr-4 pl-10 transition-all duration-200 focus:border-[var(--gradient-from)] focus:bg-white focus:ring-[var(--gradient-from)]/20"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Search button for mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-gradient-primary-hover rounded-lg p-2 transition-all duration-200 md:hidden"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-gradient-primary-hover rounded-lg p-2 transition-all duration-200"
                >
                  {languages[currentLang]?.flag || (
                    <Globe className="h-4 w-4 text-[var(--gradient-from)]" />
                  )}
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 border-gray-200 bg-white/95 backdrop-blur-xl"
            >
              <DropdownMenuLabel>{t("language", "Language")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(Object.keys(languages) as LangKey[]).map((code) => (
                <DropdownMenuItem
                  key={code}
                  onClick={() => changeLanguage(code)}
                  className="hover:bg-gradient-primary-hover transition-all duration-200"
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
              className="hover:bg-gradient-primary-hover relative rounded-lg p-2 transition-all duration-200"
            >
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold text-white shadow-sm"
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
              className="hover:bg-gradient-primary-hover rounded-lg p-2 transition-all duration-200"
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
                    <AvatarFallback className="bg-blue-500 font-semibold text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 border-gray-200 bg-white/95 backdrop-blur-xl"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none font-medium">
                    {userData?.name || "Administrator"}
                  </p>
                  <p className="text-xs leading-none text-gray-500">
                    {userData?.email || "admin@example.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-gradient-primary-hover transition-all duration-200">
                <User className="mr-2 h-4 w-4" />
                <span>{t("profile", "Profile")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gradient-primary-hover transition-all duration-200">
                <Settings className="mr-2 h-4 w-4" />
                <span>{t("settings", "Settings")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gradient-primary-hover transition-all duration-200">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>{t("help", "Help")}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 transition-all duration-200 hover:bg-red-50 hover:text-red-700"
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
