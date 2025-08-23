"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, MoreVertical } from "lucide-react";
import { useThemeStore } from "@/lib/theme-store";
import { cn } from "@/lib/utils";

// Enhanced mock data
const revenueData = [
  { month: "Jan", revenue: 45200, users: 2840, orders: 156 },
  { month: "Feb", revenue: 38900, users: 2650, orders: 142 },
  { month: "Mar", revenue: 52300, users: 3120, orders: 189 },
  { month: "Apr", revenue: 47800, users: 2980, orders: 167 },
  { month: "May", revenue: 61500, users: 3450, orders: 203 },
  { month: "Jun", revenue: 58700, users: 3280, orders: 195 },
];

// Custom tooltip with dark mode support
const CustomTooltip = ({ active, payload, label }: any) => {
  const { resolvedTheme } = useThemeStore();
  const isDark = resolvedTheme === "dark";

  if (active && payload && payload.length) {
    return (
      <div
        className={cn(
          "rounded-xl border p-3 shadow-xl backdrop-blur-xl transition-colors duration-300",
          isDark ? "border-gray-700 bg-gray-900/95" : "border-gray-200 bg-white/95",
        )}
      >
        <p
          className={cn(
            "font-semibold transition-colors duration-300",
            isDark ? "text-gray-100" : "text-gray-900",
          )}
        >
          {`${label}`}
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`Revenue: $${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  const { resolvedTheme } = useThemeStore();
  const isDark = resolvedTheme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className={cn(
          "shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl",
          isDark ? "border-gray-700 bg-gray-900/95" : "border-gray-200/80 bg-white/95",
        )}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle
                className={cn(
                  "text-xl font-bold transition-colors duration-300",
                  isDark ? "text-gray-100" : "text-gray-900",
                )}
              >
                Revenue Overview
              </CardTitle>
              <p
                className={cn(
                  "text-sm transition-colors duration-300",
                  isDark ? "text-gray-400" : "text-gray-500",
                )}
              >
                Monthly revenue trend for the past 6 months
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp
                  className={cn(
                    "h-4 w-4 transition-colors duration-300",
                    isDark ? "text-emerald-400" : "text-emerald-500",
                  )}
                />
                <span
                  className={cn(
                    "font-semibold transition-colors duration-300",
                    isDark ? "text-emerald-400" : "text-emerald-500",
                  )}
                >
                  +18.9%
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "p-1 transition-colors duration-200",
                  isDark ? "hover:bg-gray-800" : "hover:bg-gradient-primary-hover",
                )}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--gradient-from)"
                      stopOpacity={isDark ? 0.4 : 0.3}
                    />
                    <stop
                      offset="50%"
                      stopColor="var(--gradient-to)"
                      stopOpacity={isDark ? 0.3 : 0.2}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--gradient-to)"
                      stopOpacity={isDark ? 0.1 : 0.05}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className={cn(
                    "transition-colors duration-300",
                    isDark ? "stroke-gray-700" : "stroke-gray-200",
                  )}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  className={cn(
                    "transition-colors duration-300",
                    isDark ? "text-gray-400" : "text-gray-500",
                  )}
                  fontSize={12}
                  tick={{ fill: isDark ? "#9CA3AF" : "#6B7280" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  className={cn(
                    "transition-colors duration-300",
                    isDark ? "text-gray-400" : "text-gray-500",
                  )}
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  tick={{ fill: isDark ? "#9CA3AF" : "#6B7280" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--gradient-from)"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                  className="drop-shadow-sm"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Stats */}
          <div
            className={cn(
              "mt-6 grid grid-cols-3 gap-4 border-t pt-4 transition-colors duration-300",
              isDark ? "border-gray-700" : "border-gray-200",
            )}
          >
            <div className="text-center">
              <p className="text-gradient-primary text-2xl font-bold">$316.4K</p>
              <p
                className={cn(
                  "text-xs transition-colors duration-300",
                  isDark ? "text-gray-400" : "text-gray-500",
                )}
              >
                Total Revenue
              </p>
            </div>
            <div className="text-center">
              <p className="text-gradient-primary text-2xl font-bold">18.3K</p>
              <p
                className={cn(
                  "text-xs transition-colors duration-300",
                  isDark ? "text-gray-400" : "text-gray-500",
                )}
              >
                Total Users
              </p>
            </div>
            <div className="text-center">
              <p className="text-gradient-primary text-2xl font-bold">1,052</p>
              <p
                className={cn(
                  "text-xs transition-colors duration-300",
                  isDark ? "text-gray-400" : "text-gray-500",
                )}
              >
                Total Orders
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
