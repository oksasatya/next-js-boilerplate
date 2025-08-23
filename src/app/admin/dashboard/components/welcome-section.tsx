"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ensureI18n } from "@/lib/i18n";
import { ArrowUpRight, Crown, Star, Waves, BarChart3 } from "lucide-react";
import { useThemeStore } from "@/lib/theme-store";
import { cn } from "@/lib/utils";

// Ensure i18n is initialized before hooks
ensureI18n();

interface WelcomeSectionProps {
  data?: any;
}

export function WelcomeSection({ data }: WelcomeSectionProps) {
  const userName = data?.user?.name || "Administrator";
  const { t } = useTranslation();
  const { resolvedTheme } = useThemeStore();
  const isDark = resolvedTheme === "dark";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
      <Card
        className={cn(
          "relative overflow-hidden border-2 p-8 shadow-xl backdrop-blur-sm transition-all duration-300",
          isDark ? "border-gray-700 bg-gray-900/95" : "border-gray-200 bg-white",
        )}
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Animated gradient orbs */}
          <div
            className={cn(
              "absolute -top-8 -right-12 h-56 w-56 rounded-full blur-3xl transition-all duration-1000",
              isDark
                ? "bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-blue-500/30"
                : "bg-gradient-to-br from-[var(--gradient-from)]/20 via-[var(--gradient-to)]/15 to-[var(--gradient-from)]/20",
            )}
          />

          <div
            className={cn(
              "absolute -bottom-10 -left-12 h-64 w-64 rounded-full blur-3xl transition-all duration-1000",
              isDark
                ? "bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-cyan-500/30"
                : "bg-gradient-to-br from-[var(--gradient-to)]/20 via-[var(--gradient-from)]/15 to-[var(--gradient-to)]/20",
            )}
          />

          <div
            className={cn(
              "absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-all duration-1000",
              isDark
                ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
                : "bg-gradient-to-r from-[var(--gradient-from)]/10 to-[var(--gradient-to)]/10",
            )}
          />

          {/* Grid pattern */}
          <div
            className={cn(
              "absolute inset-0 opacity-40 transition-opacity duration-300",
              isDark
                ? "bg-[radial-gradient(circle_at_1px_1px,rgba(96,165,250,0.15)_1px,transparent_1px)] [background-size:20px_20px]"
                : "bg-[radial-gradient(circle_at_1px_1px,rgba(0,198,255,0.08)_1px,transparent_1px)] [background-size:20px_20px]",
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <h1
              className={cn(
                "flex items-center gap-4 text-4xl font-bold transition-colors duration-300",
                isDark ? "text-gray-100" : "text-gray-900",
              )}
            >
              <span>{t("dashboard.welcome_back", { name: userName })}</span>
              <div
                className={cn(
                  "bg-gradient-primary shadow-gradient-primary flex h-12 w-12 items-center justify-center rounded-2xl border text-white transition-all duration-300",
                  isDark ? "border-gray-600" : "border-gray-200",
                )}
              >
                <Waves className="h-6 w-6" />
              </div>
            </h1>

            <p
              className={cn(
                "text-lg font-medium transition-colors duration-300",
                isDark ? "text-gray-300" : "text-gray-600",
              )}
            >
              {t("dashboard.subtitle")}
            </p>

            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={cn(
                  "bg-gradient-primary-subtle hover:bg-gradient-primary-hover border-[var(--gradient-from)]/30 px-4 py-2 text-[var(--gradient-to)] transition-all duration-300",
                  isDark ? "hover:bg-cyan-900/20" : "hover:bg-cyan-50",
                )}
              >
                <Star className="mr-2 h-4 w-4" />
                {t("dashboard.live_data")}
              </Badge>
            </div>
          </div>

          <Button
            className={cn(
              "h-14 border px-8 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:opacity-90",
              isDark
                ? "border-blue-500 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
                : "border-blue-600 bg-blue-500 hover:bg-blue-600",
            )}
          >
            <BarChart3 className="mr-2 h-5 w-5" />
            {t("dashboard.view_reports")}
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Enhanced glow effect for dark mode */}
        {isDark && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(96, 165, 250, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(52, 211, 153, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(96, 165, 250, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </Card>
    </motion.div>
  );
}
