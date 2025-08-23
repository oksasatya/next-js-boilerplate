"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Target, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useThemeStore } from "@/lib/theme-store";
import { cn } from "@/lib/utils";

// KPI data with theme-aware design
const kpiData = [
  {
    title: "Total Revenue",
    value: "$524,300",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    bgGradient: "from-blue-50 to-cyan-50",
    bgGradientDark: "from-blue-900/20 to-cyan-900/20",
    iconBg: "bg-gradient-primary",
    textColor: "text-gray-900 dark:text-gray-100",
    changeColor: "text-[var(--gradient-to)]",
  },
  {
    title: "Active Users",
    value: "18,200",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    bgGradient: "from-emerald-50 to-green-50",
    bgGradientDark: "from-emerald-900/20 to-green-900/20",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
    textColor: "text-gray-900 dark:text-gray-100",
    changeColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Conversion Rate",
    value: "3.64%",
    change: "+0.8%",
    trend: "up",
    icon: Target,
    bgGradient: "from-purple-50 to-violet-50",
    bgGradientDark: "from-purple-900/20 to-violet-900/20",
    iconBg: "bg-gradient-to-br from-purple-500 to-violet-500",
    textColor: "text-gray-900 dark:text-gray-100",
    changeColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Growth Rate",
    value: "24.8%",
    change: "+3.2%",
    trend: "up",
    icon: TrendingUp,
    bgGradient: "from-orange-50 to-red-50",
    bgGradientDark: "from-orange-900/20 to-red-900/20",
    iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
    textColor: "text-gray-900 dark:text-gray-100",
    changeColor: "text-orange-600 dark:text-orange-400",
  },
];

export function KPICards() {
  const { resolvedTheme } = useThemeStore();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        const isPositive = kpi.trend === "up";
        const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

        return (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <Card
              className={cn(
                "group relative overflow-hidden border-2 shadow-xl transition-all duration-300 hover:shadow-2xl",
                isDark
                  ? "border-gray-700 bg-gray-900/95 hover:shadow-gray-900/50"
                  : "border-gray-200 bg-white hover:shadow-gray-200/50",
              )}
            >
              {/* Enhanced decorative background */}
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity duration-300",
                    isDark ? kpi.bgGradientDark : kpi.bgGradient,
                  )}
                />

                {/* Animated gradient orbs */}
                <div
                  className={cn(
                    "absolute -top-6 -right-6 h-24 w-24 rounded-full blur-xl transition-transform duration-500 group-hover:scale-110",
                    isDark
                      ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/10"
                      : "bg-gradient-to-br from-[var(--gradient-from)]/10 to-[var(--gradient-to)]/5",
                  )}
                />
                <div
                  className={cn(
                    "absolute -bottom-6 -left-6 h-32 w-32 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-105",
                    isDark
                      ? "bg-gradient-to-br from-cyan-500/10 to-blue-500/20"
                      : "bg-gradient-to-br from-[var(--gradient-to)]/5 to-[var(--gradient-from)]/10",
                  )}
                />
              </div>

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle
                  className={cn(
                    "text-sm font-semibold tracking-wide uppercase transition-colors duration-300",
                    isDark ? "text-gray-400" : "text-gray-600",
                  )}
                >
                  {kpi.title}
                </CardTitle>
                <div
                  className={cn(
                    "rounded-xl p-2.5 shadow-lg transition-transform duration-300 group-hover:scale-110",
                    kpi.iconBg,
                  )}
                >
                  <Icon className="h-5 w-5 text-white drop-shadow-sm" />
                </div>
              </CardHeader>

              <CardContent className="pb-4">
                <div className="space-y-3">
                  <div
                    className={cn(
                      "text-3xl font-bold tracking-tight transition-colors duration-300",
                      kpi.textColor,
                    )}
                  >
                    {kpi.value}
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-300",
                        isPositive
                          ? isDark
                            ? "border border-green-700/50 bg-green-900/30 text-green-300"
                            : "border border-green-200 bg-green-50 text-green-600"
                          : isDark
                            ? "border border-red-700/50 bg-red-900/30 text-red-300"
                            : "border border-red-200 bg-red-50 text-red-600",
                      )}
                    >
                      <TrendIcon className="h-3 w-3" />
                      {kpi.change}
                    </div>
                    <span
                      className={cn(
                        "text-xs transition-colors duration-300",
                        isDark ? "text-gray-400" : "text-gray-500",
                      )}
                    >
                      vs last month
                    </span>
                  </div>
                </div>

                {/* Progress indicator */}
                <div
                  className={cn(
                    "mt-4 h-1 w-full overflow-hidden rounded-full transition-colors duration-300",
                    isDark ? "bg-gray-800" : "bg-gray-100",
                  )}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isPositive ? "75%" : "45%" }}
                    transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                    className={cn(
                      "h-full rounded-full",
                      index === 0 ? "bg-gradient-primary" : kpi.iconBg,
                    )}
                  />
                </div>
              </CardContent>

              {/* Hover glow effect */}
              <motion.div
                className={cn(
                  "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  isDark
                    ? "bg-gradient-to-r from-blue-500/5 to-cyan-500/5"
                    : "bg-gradient-to-r from-blue-500/5 to-cyan-500/5",
                )}
              />
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
