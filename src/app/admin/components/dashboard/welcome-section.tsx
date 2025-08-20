"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ensureI18n } from "@/lib/i18n";
import { ArrowUpRight, Crown, Star, Waves, BarChart3 } from "lucide-react";

// Ensure i18n is initialized before hooks
ensureI18n();

interface WelcomeSectionProps {
  data?: any;
}

export function WelcomeSection({ data }: WelcomeSectionProps) {
  const userName = data?.user?.name || "Administrator";
  const { t } = useTranslation();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
      <Card className="relative overflow-hidden border-2 border-gray-200 bg-white p-8 shadow-xl backdrop-blur-sm">
        {/* Decorative background - Light mode */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-8 -right-12 h-56 w-56 rounded-full bg-gradient-to-br from-[var(--gradient-from)]/20 via-[var(--gradient-to)]/15 to-[var(--gradient-from)]/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-12 h-64 w-64 rounded-full bg-gradient-to-br from-[var(--gradient-to)]/20 via-[var(--gradient-from)]/15 to-[var(--gradient-to)]/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[var(--gradient-from)]/10 to-[var(--gradient-to)]/10 blur-2xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,198,255,0.08)_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <h1 className="flex items-center gap-4 text-4xl font-bold text-gray-900">
              <span>{t("dashboard.welcome_back", { name: userName })}</span>
              <div className="bg-gradient-primary shadow-gradient-primary flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 text-white">
                <Waves className="h-6 w-6" />
              </div>
            </h1>
            <p className="text-lg font-medium text-gray-600">{t("dashboard.subtitle")}</p>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="bg-gradient-primary-subtle hover:bg-gradient-primary-hover border-[var(--gradient-from)]/30 px-4 py-2 text-[var(--gradient-to)]"
              >
                <Crown className="mr-2 h-4 w-4" />
                {t("dashboard.premium_dashboard")}
              </Badge>
              <Badge
                variant="outline"
                className="bg-gradient-primary-subtle hover:bg-gradient-primary-hover border-[var(--gradient-from)]/30 px-4 py-2 text-[var(--gradient-to)]"
              >
                <Star className="mr-2 h-4 w-4" />
                {t("dashboard.live_data")}
              </Badge>
            </div>
          </div>
          <Button className="bg- h-14 border border-blue-600 bg-blue-500 px-8 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:opacity-90">
            <BarChart3 className="mr-2 h-5 w-5" />
            {t("dashboard.view_reports")}
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
