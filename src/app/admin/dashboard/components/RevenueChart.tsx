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

// Enhanced mock data
const revenueData = [
  { month: "Jan", revenue: 45200, users: 2840, orders: 156 },
  { month: "Feb", revenue: 38900, users: 2650, orders: 142 },
  { month: "Mar", revenue: 52300, users: 3120, orders: 189 },
  { month: "Apr", revenue: 47800, users: 2980, orders: 167 },
  { month: "May", revenue: 61500, users: 3450, orders: 203 },
  { month: "Jun", revenue: 58700, users: 3280, orders: 195 },
];

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white/95 p-3 shadow-xl backdrop-blur-xl">
        <p className="font-semibold text-gray-900">{`${label}`}</p>
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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border border-gray-200/80 bg-white/95 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="text-xl font-bold text-gray-900">Revenue Overview</CardTitle>
              <p className="text-sm text-gray-500">Monthly revenue trend for the past 6 months</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="font-semibold text-emerald-500">+18.9%</span>
              </div>
              <Button variant="ghost" size="sm" className="hover:bg-gradient-primary-hover p-1">
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
                    <stop offset="0%" stopColor="var(--gradient-from)" stopOpacity={0.3} />
                    <stop offset="50%" stopColor="var(--gradient-to)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="var(--gradient-to)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" opacity={0.5} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  className="text-gray-500"
                  fontSize={12}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  className="text-gray-500"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
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
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-200 pt-4">
            <div className="text-center">
              <p className="text-gradient-primary text-2xl font-bold">$316.4K</p>
              <p className="text-xs text-gray-500">Total Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-gradient-primary text-2xl font-bold">18.3K</p>
              <p className="text-xs text-gray-500">Total Users</p>
            </div>
            <div className="text-center">
              <p className="text-gradient-primary text-2xl font-bold">1,052</p>
              <p className="text-xs text-gray-500">Total Orders</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
