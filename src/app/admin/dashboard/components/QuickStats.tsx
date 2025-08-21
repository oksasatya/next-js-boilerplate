"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

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
  },
];

export function QuickStats() {
  return (
    <Card className="border border-gray-200/80 bg-white/95 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">Quick Stats</CardTitle>
        <p className="text-sm text-gray-500">Real-time performance metrics</p>
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
              className={`relative rounded-xl p-4 ${stat.bgColor} group cursor-pointer border border-gray-200/50 transition-all duration-300 hover:border-[var(--gradient-from)]/30`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`rounded-lg p-2.5 ${stat.iconBg} shadow-lg`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>

                <Badge
                  variant={isPositive ? "default" : "destructive"}
                  className={`flex items-center gap-1 ${
                    isPositive
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  } border-0`}
                >
                  <TrendIcon className="h-3 w-3" />
                  {stat.change}
                </Badge>
              </div>

              {/* Hover effect overlay */}
              <div className="bg-gradient-primary-hover absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          );
        })}

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 border-t border-gray-200 pt-4"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Last updated</span>
            <span className="text-gradient-primary font-medium">2 minutes ago</span>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
