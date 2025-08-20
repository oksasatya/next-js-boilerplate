"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Target, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

// KPI data with light mode design
const kpiData = [
  {
    title: "Total Revenue",
    value: "$524,300",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    bgGradient: "from-blue-50 to-cyan-50",
    iconBg: "bg-gradient-primary",
    textColor: "text-gray-900",
    changeColor: "text-[var(--gradient-to)]",
  },
  {
    title: "Active Users",
    value: "18,200",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    bgGradient: "from-emerald-50 to-green-50",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
    textColor: "text-gray-900",
    changeColor: "text-emerald-600",
  },
  {
    title: "Conversion Rate",
    value: "3.64%",
    change: "+0.8%",
    trend: "up",
    icon: Target,
    bgGradient: "from-purple-50 to-violet-50",
    iconBg: "bg-gradient-to-br from-purple-500 to-violet-500",
    textColor: "text-gray-900",
    changeColor: "text-purple-600",
  },
  {
    title: "Growth Rate",
    value: "24.8%",
    change: "+3.2%",
    trend: "up",
    icon: TrendingUp,
    bgGradient: "from-orange-50 to-red-50",
    iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
    textColor: "text-gray-900",
    changeColor: "text-orange-600",
  },
];

export function KPICards() {
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
            <Card className="group relative overflow-hidden border-2 border-gray-200 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
              {/* Enhanced decorative background */}
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${kpi.bgGradient} opacity-50`}
                />

                {/* Animated gradient orbs */}
                <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br from-[var(--gradient-from)]/10 to-[var(--gradient-to)]/5 blur-xl transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-gradient-to-br from-[var(--gradient-to)]/5 to-[var(--gradient-from)]/10 blur-2xl transition-transform duration-700 group-hover:scale-105" />
              </div>

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold tracking-wide text-gray-600 uppercase">
                  {kpi.title}
                </CardTitle>
                <div
                  className={`rounded-xl p-2.5 ${kpi.iconBg} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-5 w-5 text-white drop-shadow-sm" />
                </div>
              </CardHeader>

              <CardContent className="pb-4">
                <div className="space-y-3">
                  <div className={`text-3xl font-bold ${kpi.textColor} tracking-tight`}>
                    {kpi.value}
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-300 ${
                        isPositive
                          ? "border border-green-200 bg-green-50 text-green-600"
                          : "border border-red-200 bg-red-50 text-red-600"
                      }`}
                    >
                      <TrendIcon className="h-3 w-3" />
                      {kpi.change}
                    </div>
                    <span className="text-xs text-gray-500">vs last month</span>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isPositive ? "75%" : "45%" }}
                    transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                    className={`h-full rounded-full ${index === 0 ? "bg-gradient-primary" : kpi.iconBg}`}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
