"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useThemeStore } from "@/lib/theme-store";
import { cn } from "@/lib/utils";

const quickStatsData = [
  {
    id: 1,
    title: "Active Sessions",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Clock,
    iconBg: "bg-gradient-primary",
    bgColor: "bg-gradient-primary-subtle",
    bgColorDark: "from-blue-900/20 to-cyan-900/20",
  },
  {
    id: 2,
    title: "Orders Today",
    value: "156",
    change: "+8%",
    trend: "up",
    icon: ShoppingCart,
    iconBg: "bg-gradient-to-r from-emerald-500 to-teal-500",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
    bgColorDark: "from-emerald-900/20 to-teal-900/20",
  },
  {
    id: 3,
    title: "New Users",
    value: "89",
    change: "+24%",
    trend: "up",
    icon: Users,
    iconBg: "bg-gradient-to-r from-violet-500 to-purple-500",
    bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
    bgColorDark: "from-violet-900/20 to-purple-900/20",
  },
  {
    id: 4,
    title: "Bounce Rate",
    value: "2.4%",
    change: "-5%",
    trend: "down",
    icon: TrendingUp,
    iconBg: "bg-gradient-to-r from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    bgColorDark: "from-orange-900/20 to-red-900/20",
  },
];

export function QuickStats() {
  const { resolvedTheme } = useThemeStore();
  const isDark = resolvedTheme === "dark";

  return (
    <Card
      className={cn(
        "shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl",
        isDark ? "border-gray-700 bg-gray-900/95" : "border-gray-200/80 bg-white/95",
      )}
    >
      <CardHeader className="pb-4">
        <CardTitle
          className={cn(
            "text-xl font-bold transition-colors duration-300",
            isDark ? "text-gray-100" : "text-gray-900",
          )}
        >
          Quick Stats
        </CardTitle>
        <p
          className={cn(
            "text-sm transition-colors duration-300",
            isDark ? "text-gray-400" : "text-gray-500",
          )}
        >
          Real-time performance metrics
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {quickStatsData.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";
          const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group cursor-pointer rounded-xl border p-4 transition-all duration-300",
                isDark
                  ? `bg-gradient-to-br ${stat.bgColorDark} border-gray-700/50 hover:border-blue-500/30`
                  : `${stat.bgColor} border-gray-200/50 hover:border-[var(--gradient-from)]/30`,
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={cn("rounded-lg p-2.5 shadow-lg", stat.iconBg)}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <p
                      className={cn(
                        "text-sm font-medium transition-colors duration-300",
                        isDark ? "text-gray-300" : "text-gray-600",
                      )}
                    >
                      {stat.title}
                    </p>
                    <p
                      className={cn(
                        "text-2xl font-bold transition-colors duration-300",
                        isDark ? "text-gray-100" : "text-gray-900",
                      )}
                    >
                      {stat.value}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={isPositive ? "default" : "destructive"}
                  className={cn(
                    "flex items-center gap-1 border-0 transition-colors duration-300",
                    isPositive
                      ? isDark
                        ? "bg-emerald-900/30 text-emerald-300 hover:bg-emerald-900/40"
                        : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      : isDark
                        ? "bg-red-900/30 text-red-300 hover:bg-red-900/40"
                        : "bg-red-100 text-red-700 hover:bg-red-200",
                  )}
                >
                  <TrendIcon className="h-3 w-3" />
                  {stat.change}
                </Badge>
              </div>

              {/* Hover effect overlay */}
              <div
                className={cn(
                  "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  isDark
                    ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
                    : "bg-gradient-primary-hover",
                )}
              />
            </motion.div>
          );
        })}

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={cn(
            "mt-6 border-t pt-4 transition-colors duration-300",
            isDark ? "border-gray-700" : "border-gray-200",
          )}
        >
          <div className="flex items-center justify-between text-sm">
            <span
              className={cn(
                "transition-colors duration-300",
                isDark ? "text-gray-400" : "text-gray-500",
              )}
            >
              Last updated
            </span>
            <span className="text-gradient-primary font-medium">2 minutes ago</span>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
